<?php

namespace Gram\EventBundle\Service;

use Gram\EventBundle\Entity\Pharmacy;
use Gram\EventBundle\Entity\PharmacyRepository;
use JMS\Serializer\SerializationContext;
use Symfony\Component\DependencyInjection\ContainerInterface;

class PharmacyService
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

    public function getCount($filter = [])
    {
        $em = $this->container->get('doctrine')->getManager();

        /** @var PharmacyRepository $repo */
        $repo = $em->getRepository(Pharmacy::class);

        return $repo->countByFilter($filter);
    }

    public function getEntities($filter = [], $page = 0, $limit = 0)
    {
        $em = $this->container->get('doctrine')->getManager();

        /** @var PharmacyRepository $repo */
        $repo = $em->getRepository(Pharmacy::class);

        return $repo->findByFilter($filter, $page, $limit);
    }

}