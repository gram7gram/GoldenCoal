<?php

namespace Gram\EventBundle\Service;

use Gram\EventBundle\Entity\Address;
use Gram\EventBundle\Entity\Event;
use Gram\EventBundle\Entity\Participant;
use Gram\EventBundle\Entity\ParticipantRepository;
use Gram\EventBundle\Entity\Pharmacy;
use Gram\EventBundle\Entity\PharmacyType;
use Gram\EventBundle\Entity\Region;
use JMS\Serializer\SerializationContext;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ParticipantService
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

    public function participate(Event $event, array $content)
    {
        $em = $this->container->get('doctrine')->getManager();

        $participant = new Participant();
        $participant->setEvent($event);
        $participant->setLastName(isset($content['lastName']) ? $content['lastName'] : null);
        $participant->setFirstName(isset($content['firstName']) ? $content['firstName'] : null);
        $participant->setMiddleName(isset($content['middleName']) ? $content['middleName'] : null);
        $participant->setEmail(isset($content['email']) ? $content['email'] : null);
        $participant->setLegalName(isset($content['legalName']) ? $content['legalName'] : null);

        if (isset($content['address'])) {
            $this->handleAddress($participant, $content['address']);
        }

        if (isset($content['pharmacy'])) {
            $this->handlePharmacy($participant, $content['pharmacy']);
        }

        $em->persist($participant);
        $em->flush();

        return $participant;
    }

    private function handlePharmacy(Participant $participant, $content)
    {
        $em = $this->container->get('doctrine')->getManager();

        $entity = null;
        if (isset($content['edrpou'])) {
            $entity = $em->getRepository(Pharmacy::class)->findOneBy([
                'okpo' => $content['edrpou']
            ]);
        }

        if (!$entity) {
            $entity = new Pharmacy();
            $entity->setOkpo(isset($content['edrpou']) ? $content['edrpou'] : null);
            $entity->setName(isset($content['name']) ? $content['name'] : null);
            $entity->setNumber(isset($content['number']) ? $content['number'] : null);

            if (isset($content['type'])) {
                $type = $em->getRepository(PharmacyType::class)->find($content['type']['id']);
                if (!$type) {
                    throw new \Exception('Type was not found', 404);
                }

                $entity->setType($type);
            }
        }

        $em->persist($entity);

        $participant->setPharmacy($entity);
    }

    private function handleAddress(Participant $participant, $content)
    {
        $em = $this->container->get('doctrine')->getManager();

        $entity = new Address();
        $entity->setCity(isset($content['city']) ? $content['city'] : null);
        $entity->setStreet(isset($content['street']) ? $content['street'] : null);

        if (isset($content['region'])) {
            $region = $em->getRepository(Region::class)->find($content['region']['id']);
            if (!$region) {
                throw new \Exception('Region was not found', 404);
            }

            $entity->setRegion($region);
        }

        $em->persist($entity);

        $participant->setAddress($entity);
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

        /** @var ParticipantRepository $repo */
        $repo = $em->getRepository(Participant::class);

        return $repo->countByFilter($filter);
    }

    public function getEntities($filter, $page, $limit)
    {
        $em = $this->container->get('doctrine')->getManager();

        /** @var ParticipantRepository $repo */
        $repo = $em->getRepository(Participant::class);

        return $repo->findByFilter($filter, $page, $limit);
    }

}