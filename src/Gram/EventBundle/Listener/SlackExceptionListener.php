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

        $accessToken = $this->container->getParameter('slack_monitoring_token');
        if (!$accessToken) return;

        $messageTemplates = [
            "%s \n *With code:* %s \n *File:* %s \n *Line:* %s \n *ip:* %s \n *Path:* %s  \n *Trace:* __trace__",
        ];

        $content = $exception->getMessage();

        $message = sprintf(
            $messageTemplates[mt_rand(0, count($messageTemplates) - 1)],
            $content,
            $exception->getCode(),
            $exception->getFile(),
            $exception->getLine(),
            $this->container->get('request_stack')->getCurrentRequest()->getClientIp(),
            $event->getRequest()->getPathInfo()
        );

        $traceLine = '';

        $traces = $exception->getTrace();

        foreach ($traces as $trace) {
            if (isset($trace['file']) && isset($trace['line'])) {
                $traceLine .= "\n" . $trace['file'] . "::" . $trace['line'];
            }
        }

        $message = str_replace('__trace__', $traceLine, $message);
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

    public function onBadResponse(FilterResponseEvent $event)
    {
        if (!$this->isProd()) return;

        $accessToken = $this->container->getParameter('slack_monitoring_token');
        if (!$accessToken) return;

        $response = $event->getResponse();
        $request = $event->getRequest();

        $badStatusCodes = [400, 403, 404, 500, 501];

        if (in_array($response->getStatusCode(), $badStatusCodes)) {

            $messageTemplates = [
                "Content: %s \n  *With code:*  %s \n Request method: %s \n Request query: %s  \n *ip:* %s \n *Path:* %s  ",
            ];

            $content = $response->headers->get('Content-Type', $response->getContent());
            if (strpos($content, 'text/html') !== false) {
                $content = '<html>...</html>';
            }

            $message = sprintf(
                $messageTemplates[mt_rand(0, count($messageTemplates) - 1)],
                $content,
                $response->getStatusCode(),
                $request->getMethod(),
                json_encode($request->query->all()),
                $this->container->get('request_stack')->getCurrentRequest()->getClientIp(),
                $event->getRequest()->getPathInfo()
            );

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
}