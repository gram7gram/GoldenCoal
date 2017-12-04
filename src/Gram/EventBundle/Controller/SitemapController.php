<?php

namespace Gram\EventBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class SitemapController extends Controller
{

    public function participantsAction()
    {
       return $this->render('@GramEvent/Sitemap/participant.html.twig');
    }

    public function aboutAction()
    {
       return $this->render('@GramEvent/Sitemap/about.html.twig');
    }

    public function indexAction()
    {
       return $this->render('@GramEvent/Sitemap/index.html.twig');
    }

    public function contactAction()
    {
       return $this->render('@GramEvent/Sitemap/contact.html.twig');
    }

    public function winnerAction()
    {
       return $this->render('@GramEvent/Sitemap/winner.html.twig');
    }
}
