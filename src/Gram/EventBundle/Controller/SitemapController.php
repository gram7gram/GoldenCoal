<?php

namespace Gram\EventBundle\Controller;

use Gram\EventBundle\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class SitemapController extends Controller
{

    public function indexAction()
    {
        return $this->render('@GramEvent/Sitemap/index.html.twig');
    }

    public function contactAction()
    {
        return $this->render('@GramEvent/Sitemap/contact.html.twig');
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
        switch ($code) {
            case Event::GOLDEN_COAL:
                return $this->render('@GramEvent/Sitemap/golden-coal/participant.html.twig');
            case Event::WHITE_COAL:
                return $this->render('@GramEvent/Sitemap/white-coal/participant.html.twig');
            default:
                throw $this->createNotFoundException();
        }
    }

    public function aboutAction($code)
    {
        switch ($code) {
            case Event::GOLDEN_COAL:
                return $this->render('@GramEvent/Sitemap/golden-coal/about.html.twig');
            case Event::WHITE_COAL:
                return $this->render('@GramEvent/Sitemap/white-coal/about.html.twig');
            default:
                throw $this->createNotFoundException();
        }
    }

    public function winnerAction($code)
    {
        switch ($code) {
            case Event::GOLDEN_COAL:
                return $this->render('@GramEvent/Sitemap/golden-coal/winner.html.twig');
            case Event::WHITE_COAL:
                return $this->render('@GramEvent/Sitemap/white-coal/winner.html.twig');
            default:
                throw $this->createNotFoundException();
        }
    }
}
