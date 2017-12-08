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
            "*Code:* %s\n*Content*: %s\n*File*: %s\n*Line*: %s\n*ip*: %s\n*Path*: %s\n*Trace*: %s",
        ];

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
            $exception->getCode(),
            $content,
            $exception->getFile(),
            $exception->getLine(),
            $event->getRequest()->getClientIp(),
            $event->getRequest()->getPathInfo(),
            $traceLine
        );

        $this->notify($message);
    }

    public function onBadResponse(FilterResponseEvent $event)
    {
        if (!$this->isProd()) return;

        $response = $event->getResponse();
        $request = $event->getRequest();
        $status = $response->getStatusCode();

        $messageTemplates = [
            "*Code:* %s\n*Content*: %s\n*Method*: %s\n*GET query*: %s\n*POST query*: %s\n*Body*: %s\n*ip*: %s\n*Path*: %s",
        ];

        $content = $response->headers->get('Content-Type', $response->getContent());
        if (strpos($content, 'text/html') !== false) {
            $content = '<html>...</html>';
        }

        $message = sprintf(
            $messageTemplates[mt_rand(0, count($messageTemplates) - 1)],
            $response->getStatusCode(),
            $content,
            $request->getMethod(),
            json_encode($request->query->all()),
            json_encode($request->request->all()),
            $request->getContent(),
            $request->getClientIp(),
            $request->getPathInfo()
        );

        if ($status === 400) {
            $channel = 'golden-coal-404';
        } elseif ($status === 500) {
            $channel = 'golden-coal-500';
        } elseif ($status >= 400 && $status < 500) {
            $channel = 'golden-coal-4xx';
        } else {
            $channel = null;
        }

        $this->notify($message, $channel);
    }

    private function notify($message, $channel = null)
    {
        $accessTokens = $this->container->getParameter('slack_monitoring_token');
        if (!$accessTokens) return;

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