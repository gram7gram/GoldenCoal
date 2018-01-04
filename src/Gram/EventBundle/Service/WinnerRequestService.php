<?php

namespace Gram\EventBundle\Service;

use Gram\EventBundle\Entity\Pharmacy;
use Gram\EventBundle\Entity\Prize;
use Gram\EventBundle\Entity\WinnerRequest;
use JMS\Serializer\SerializationContext;
use Symfony\Component\DependencyInjection\ContainerInterface;

class WinnerRequestService
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

    public function create($content)
    {

        if (!(isset($content['email'])
            && isset($content['phone'])
            && isset($content['destination'])
            && isset($content['city'])
            && isset($content['event'])
            && isset($content['firstName'])
            && isset($content['lastName'])
            && isset($content['prize'])
            && isset($content['pharmacy']))) {
            throw new \Exception('missing required parameters', 422);
        }

        $em = $this->container->get('doctrine')->getManager();

        $winnerRequest = new WinnerRequest();
        $winnerRequest->setFirstName($content['firstName']);
        $winnerRequest->setLastName($content['lastName']);
        $winnerRequest->setEmail($content['email']);
        $winnerRequest->setPhone($content['phone']);
        $winnerRequest->setCity($content['city']);
        $winnerRequest->setDestination($content['destination']);

        if (isset($content['comment'])) {
            $winnerRequest->setComment($content['comment']);
        }

        /** @var Prize $prize */
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

        /** @var Pharmacy $pharmacy */
        $pharmacy = $pharmacies[0];

        $winnerRequest->setEvent($prize->getEvent());
        $winnerRequest->setPrize($prize);
        $winnerRequest->setPharmacy($pharmacy);

        $em->persist($winnerRequest);

        $em->flush();

        return $winnerRequest;
    }

    public function serialize($media)
    {
        $serializer = $this->container->get('jms_serializer');

        $content = $serializer->serialize($media, 'json',
            SerializationContext::create()->setGroups(['basic']));

        return json_decode($content, true);
    }
}