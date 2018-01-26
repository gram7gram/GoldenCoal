<?php

namespace Gram\EventBundle\Listener;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;

class SlackExceptionListener
{
    /** @var ContainerInterface */
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    private function isProd()
    {
        $env = $this->container->getParameter('kernel.environment');
        return $env === 'prod';
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        if (!$this->isProd()) return;

        $exception = $event->getException();
        if ($exception instanceof AuthenticationCredentialsNotFoundException) return;

        $messageTemplates = [
            "*%s*\n*Path*: `%s`\n*Code:* `%s`\n*Content*: %s\n*File*: %s\n*Line*: %s\n*ip*: %s\n*Trace*: %s",
        ];

        $status = intval($exception->getCode());

        if ($exception instanceof AccessDeniedException
            || $exception instanceof AccessDeniedHttpException) {
            $status = 403;
        }

        if ($exception instanceof NotFoundHttpException) {
            $status = 404;
        }

        $content = $exception->getMessage();
        $traceLine = '';

        $traces = $exception->getTrace();

        foreach ($traces as $trace) {
            if (isset($trace['file']) && isset($trace['line'])) {
                $traceLine .= "\n" . $trace['file'] . "::" . $trace['line'];
            }
        }

        $message = sprintf(
            $messageTemplates[mt_rand(0, count($messageTemplates) - 1)],
            get_class($exception),
            $event->getRequest()->getPathInfo(),
            $status,
            $content,
            $exception->getFile(),
            $exception->getLine(),
            $event->getRequest()->getClientIp(),
            $traceLine
        );

        $this->notify($message, $status);
    }

    public function onBadResponse(FilterResponseEvent $event)
    {
        if (!$this->isProd()) return;

        $response = $event->getResponse();
        $request = $event->getRequest();
        $status = intval($response->getStatusCode());

        if ($status < 300) return;

        $messageTemplates = [
            "*Bad response*\n*Path*: `%s`\n*Code:* `%s`\n*Content*: %s\n*Method*: `%s`\n*GET query*: %s\n*POST query*: %s\n*Body*: %s\n*ip*: %s\n",
        ];

        $content = $response->headers->get('Content-Type', $response->getContent());
        if (strpos($content, 'text/html') !== false
            || strpos($response->getContent(), '<html') !== -1) {
            $content = '<html>...</html>';
        }

        $message = sprintf(
            $messageTemplates[mt_rand(0, count($messageTemplates) - 1)],
            $request->getPathInfo(),
            $status,
            $content,
            $request->getMethod(),
            json_encode($request->query->all()),
            json_encode($request->request->all()),
            $request->getContent(),
            $request->getClientIp()
        );

        $this->notify($message, $status);
    }

    private function notify($message, $status = null)
    {
        $accessTokens = $this->container->getParameter('slack_monitoring_token');
        if (!$accessTokens) return null;

        if ($status === 404) {
            $channel = 'golden-coal-404';
        } elseif ($status === 500) {
            $channel = 'golden-coal-500';
        } else {
            $channel = 'golden-coal-4xx';
        }

        if ($channel && isset($accessTokens[$channel])) {
            $accessToken = $accessTokens[$channel]['token'];
        } else {
            $defaultChannel = $accessTokens['default'];
            $accessToken = $accessTokens[$defaultChannel]['token'];
        }

        if (!$accessToken) return null;

        $data = json_encode([
            'text' => $message
        ]);

        $ch = curl_init('https://hooks.slack.com/services/' . $accessToken);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data)
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $content = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        return [
            'status' => $code,
            'content' => $content,
        ];
    }
}