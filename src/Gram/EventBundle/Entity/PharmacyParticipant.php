<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity(repositoryClass="Gram\EventBundle\Entity\PharmacyParticipantRepository")
 * @ORM\Table(name="event_bundle_pharmacy_participant", uniqueConstraints={
 *     @ORM\UniqueConstraint(name="uniq_event_bundle_pharmacy", columns={"pharmacy_id", "event_id"})
 * })
 */
class PharmacyParticipant
{

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     *
     * @JMS\Groups({"basic"})
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", nullable=false)
     */
    private $createdAt;

    /**
     * @var Pharmacy
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Pharmacy")
     *
     * @JMS\Groups({"basic"})
     */
    private $pharmacy;

    /**
     * @var Event
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Event")
     *
     * @JMS\Groups({"basic"})
     */
    private $event;


    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    /**
     * @return Pharmacy
     */
    public function getPharmacy(): ?Pharmacy
    {
        return $this->pharmacy;
    }

    /**
     * @param Pharmacy $pharmacy
     */
    public function setPharmacy(Pharmacy $pharmacy): void
    {
        $this->pharmacy = $pharmacy;
    }

    /**
     * @return Event
     */
    public function getEvent(): ?Event
    {
        return $this->event;
    }

    /**
     * @param Event $event
     */
    public function setEvent(Event $event): void
    {
        $this->event = $event;
    }
}