<?php

namespace Gram\EventBundle\Service;

use Gram\EventBundle\Entity\Event;
use Gram\EventBundle\Entity\Participant;
use Gram\EventBundle\Entity\Pharmacy;
use Gram\EventBundle\Entity\Prize;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ContactService
{
    /** @var ContainerInterface */
    protected $container;

    /**
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function requestPrizeFromManager($content)
    {
        $managers = $this->container->getParameter('managers');
        if (!$managers) return [];

        $em = $this->container->get('doctrine')->getManager();

        $prize = $em->getRepository(Prize::class)->findOneBy([
            'id' => $content['prize']['id'],
            'event' => $content['event']['id'],
        ]);
        if (!$prize) {
            throw new \Exception('Prize was not found', 404);
        }

        $pharmacies = $em->getRepository(Pharmacy::class)->findByFilter([
            'id' => $content['pharmacy']['id']
        ], 1, 1);
        if (count($pharmacies) !== 1) {
            throw new \Exception('Pharmacy was not found', 404);
        }

        $pharmacy = $pharmacies[0];

        $result = [];

        $sender = $this->container->getParameter('mailer_user');
        $twig = $this->container->get('twig');
        $mailer = $this->container->get('mailer');
        $trans = $this->container->get('translator');

        $html = $twig->render(':email:request-prize.html.twig', [
            'prize' => $prize,
            'event' => $prize->getEvent(),
            'pharmacy' => $pharmacy,
            'email' => $content['email'],
            'name' => $content['name'],
            'content' => $content['content'],
        ]);

        $subject = $trans->trans('contact.email.new_message_subject', [], 'GramEventBundle');

        foreach ($managers as $manager) {
            $message = \Swift_Message::newInstance();
            $message
                ->setFrom($sender)
                ->setTo($manager)
                ->setSubject($subject);

            $message->setBody($html, 'text/html');

            $status = $mailer->send($message);

            $result[] = [
                'status' => $status,
            ];
        }

        return $result;
    }

    public function notifyManager($from, $name, $content)
    {
        $managers = $this->container->getParameter('managers');

        if (!$managers) return [];

        $result = [];

        $sender = $this->container->getParameter('mailer_user');
        $twig = $this->container->get('twig');
        $mailer = $this->container->get('mailer');
        $trans = $this->container->get('translator');

        $html = $twig->render(':email:contact.html.twig', [
            'email' => $from,
            'name' => $name,
            'content' => $content,
        ]);
        $subject = $trans->trans('contact.email.new_message_subject', [], 'GramEventBundle');

        foreach ($managers as $manager) {
            $message = \Swift_Message::newInstance();
            $message
                ->setFrom($sender)
                ->setTo($manager)
                ->setSubject($subject);

            $message->setBody($html, 'text/html');

            $status = $mailer->send($message);

            $result[] = [
                'status' => $status,
            ];
        }

        return $result;
    }

    public function notifyManagerNewParticipant(Event $event, Participant $participant)
    {
        $managers = $this->container->getParameter('managers');

        if (!$managers) return;

        $sender = $this->container->getParameter('mailer_user');
        $twig = $this->container->get('twig');
        $mailer = $this->container->get('mailer');
        $trans = $this->container->get('translator');

        $html = $twig->render(':email:register-admin.html.twig', [
            'event' => $event,
            'participant' => $participant,
        ]);

        $subject = $trans->trans('contact.email.new_participant_subject', [
            '__EVENT__' => $event->getName()
        ], 'GramEventBundle');

        foreach ($managers as $manager) {
            $message = \Swift_Message::newInstance();
            $message
                ->setFrom($sender)
                ->setTo($manager)
                ->setSubject($subject);

            $message->setBody($html, 'text/html');

            $mailer->send($message);
        }
    }

}