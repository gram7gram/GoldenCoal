<?php

namespace Gram\EventBundle\Service;

use Gram\EventBundle\Entity\WinnerPharmacy;
use Gram\EventBundle\Entity\WinnerPharmacyRepository;
use JMS\Serializer\SerializationContext;
use Symfony\Component\DependencyInjection\ContainerInterface;

class WinnerPharmacyService
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

    public function getCount($filter)
    {
        $em = $this->container->get('doctrine')->getManager();

        /** @var WinnerPharmacyRepository $repo */
        $repo = $em->getRepository(WinnerPharmacy::class);

        return $repo->countByFilter($filter);
    }

    public function getEntities($filter, $page, $limit)
    {
        $em = $this->container->get('doctrine')->getManager();

        /** @var WinnerPharmacyRepository $repo */
        $repo = $em->getRepository(WinnerPharmacy::class);

        return $repo->findByFilter($filter, $page, $limit);
    }

}