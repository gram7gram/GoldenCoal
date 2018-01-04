<?php

namespace Gram\EventBundle\Service;

use Gram\EventBundle\Entity\Event;
use JMS\Serializer\SerializationContext;
use Symfony\Component\DependencyInjection\ContainerInterface;

class EventService
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

    public function serialize($media)
    {
        $serializer = $this->container->get('jms_serializer');

        $content = $serializer->serialize($media, 'json',
            SerializationContext::create()->setGroups(['basic']));

        return json_decode($content, true);
    }

    public function getEntity($id)
    {
        $em = $this->container->get('doctrine')->getManager();

        $repo = $em->getRepository(Event::class);

        return $repo->find($id);
    }

}