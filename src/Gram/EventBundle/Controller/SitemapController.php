<?php

namespace Gram\EventBundle\Controller;

use Gram\EventBundle\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class SitemapController extends Controller
{

    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $events = $em->getRepository(Event::class)->findAll();
        $registry = [];
        foreach ($events as $event) {
            $registry[$event->getCode()] = $event;
        }

        return $this->render('@GramEvent/Sitemap/index.html.twig', [
            'events' => $registry
        ]);
    }

    public function contactAction($code)
    {
        switch ($code) {
            case Event::GOLDEN_COAL:

                throw new AccessDeniedHttpException();

                return $this->render('@GramEvent/Sitemap/golden-coal/contact.html.twig');
            case Event::WHITE_COAL:
                return $this->render('@GramEvent/Sitemap/white-coal/contact.html.twig');
            default:
                throw $this->createNotFoundException();
        }
    }

    public function eventAction($code)
    {
        $em = $this->getDoctrine()->getManager();
        $event = $em->getRepository(Event::class)->findOneBy([
            'code' => $code
        ]);
        if (!$event) {
            throw $this->createNotFoundException();
        }

        switch ($code) {
            case Event::GOLDEN_COAL:

                throw new AccessDeniedHttpException();

                return $this->render('@GramEvent/Sitemap/golden-coal/index.html.twig', [
                    'event' => $event
                ]);
            case Event::WHITE_COAL:
                return $this->render('@GramEvent/Sitemap/white-coal/index.html.twig', [
                    'event' => $event
                ]);
            default:
                throw $this->createNotFoundException();
        }
    }

    public function registerAction($code)
    {

        throw new AccessDeniedHttpException();

        $em = $this->getDoctrine()->getManager();
        $event = $em->getRepository(Event::class)->findOneBy([
            'code' => $code
        ]);
        if (!$event) {
            throw $this->createNotFoundException();
        }

        if ($event->isExpired()) {
            return $this->render('@GramEvent/Sitemap/expired.html.twig');
        }

        switch ($code) {
            case Event::GOLDEN_COAL:
                return $this->render('@GramEvent/Sitemap/golden-coal/register.html.twig', [
                    'event' => $event
                ]);
            case Event::WHITE_COAL:
                return $this->render('@GramEvent/Sitemap/white-coal/register.html.twig', [
                    'event' => $event
                ]);
            default:
                throw $this->createNotFoundException();
        }
    }

    public function participantsAction($code)
    {
        $em = $this->getDoctrine()->getManager();
        $event = $em->getRepository(Event::class)->findOneBy([
            'code' => $code
        ]);
        if (!$event) {
            throw $this->createNotFoundException();
        }

        switch ($code) {
            case Event::GOLDEN_COAL:

                throw new AccessDeniedHttpException();

                return $this->render('@GramEvent/Sitemap/golden-coal/participant.html.twig', [
                    'event' => $event
                ]);
            case Event::WHITE_COAL:
                return $this->render('@GramEvent/Sitemap/white-coal/participant.html.twig', [
                    'event' => $event
                ]);
            default:
                throw $this->createNotFoundException();
        }
    }

    public function aboutAction($code)
    {
        $em = $this->getDoctrine()->getManager();
        $event = $em->getRepository(Event::class)->findOneBy([
            'code' => $code
        ]);
        if (!$event) {
            throw $this->createNotFoundException();
        }

        switch ($code) {
            case Event::GOLDEN_COAL:

                throw new AccessDeniedHttpException();

                return $this->render('@GramEvent/Sitemap/golden-coal/about.html.twig', [
                    'event' => $event
                ]);
            case Event::WHITE_COAL:
                return $this->render('@GramEvent/Sitemap/white-coal/about.html.twig', [
                    'event' => $event
                ]);
            default:
                throw $this->createNotFoundException();
        }
    }

    public function winnerAction($code)
    {

        $em = $this->getDoctrine()->getManager();
        $event = $em->getRepository(Event::class)->findOneBy([
            'code' => $code
        ]);
        if (!$event) {
            throw $this->createNotFoundException();
        }

        switch ($code) {
            case Event::GOLDEN_COAL:

                throw new AccessDeniedHttpException();

                return $this->render('@GramEvent/Sitemap/golden-coal/winner.html.twig', [
                    'event' => $event
                ]);
            case Event::WHITE_COAL:

                return $this->render('@GramEvent/Sitemap/white-coal/winner.html.twig', [
                    'event' => $event
                ]);
            default:
                throw $this->createNotFoundException();
        }
    }
}
