<?php

namespace Gram\EventBundle\Listener;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
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
            "*Exception*\n*Path*: `%s`\n*Code:* `%s`\n*Content*: %s\n*File*: %s\n*Line*: %s\n*ip*: %s\n*Trace*: %s",
        ];

        $status = intval($exception->getCode());
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

        $messageTemplates = [
            "*Bad response*\n*Path*: `%s`\n*Code:* `%s`\n*Content*: %s\n*Method*: `%s`\n*GET query*: %s\n*POST query*: %s\n*Body*: %s\n*ip*: %s\n",
        ];

        $content = $response->headers->get('Content-Type', $response->getContent());
        if (strpos($content, 'text/html') !== false) {
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
        if (!$accessTokens) return;

        if ($status === 404) {
            $channel = 'golden-coal-404';
        } elseif ($status === 500) {
            $channel = 'golden-coal-500';
        } elseif ($status >= 400 && $status < 500) {
            $channel = 'golden-coal-4xx';
        } else {
            $channel = null;
        }

        if ($channel && isset($accessTokens[$channel])) {
            $accessToken = $accessTokens[$channel]['token'];
        } else {
            $defaultChannel = $accessTokens['default'];
            $accessToken = $accessTokens[$defaultChannel]['token'];
        }

        if (!$accessToken) return;

        $message = str_replace('\'', '`', $message);
        $message = str_replace('"', '`', $message);

        $ch = curl_init('https://hooks.slack.com/services/' . $accessToken);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array(
            'payload' => '{"text": "' . $message . '"}'
        ));
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_exec($ch);

        curl_close($ch);
    }
}