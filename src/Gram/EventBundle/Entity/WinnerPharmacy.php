<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity(repositoryClass="Gram\EventBundle\Entity\WinnerPharmacyRepository", readOnly=true)
 * @ORM\Table(name="event_bundle_winner_pharmacy")
 */
class WinnerPharmacy
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
     *
     * @JMS\Groups({"basic"})
     */
    private $createdAt;

    /**
     * @var Pharmacy
     *
     * @ORM\OneToOne(targetEntity="Gram\EventBundle\Entity\Pharmacy")
     * @ORM\JoinColumn(nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $pharmacy;

    /**
     * @var Prize
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Prize")
     * @ORM\JoinColumn(nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $prize;

    /**
     * @var Event
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Event")
     * @ORM\JoinColumn(nullable=false)
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
     * @return Prize
     */
    public function getPrize(): ?Prize
    {
        return $this->prize;
    }

    /**
     * @param Prize $prize
     */
    public function setPrize(Prize $prize): void
    {
        $this->prize = $prize;
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