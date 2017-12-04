<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity(repositoryClass="Gram\EventBundle\Entity\WinnerRepository")
 * @ORM\Table(name="event_bundle_winner")
 */
class Winner
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
     * @var Participant
     *
     * @ORM\OneToOne(targetEntity="Gram\EventBundle\Entity\Participant")
     *
     * @JMS\Groups({"basic"})
     */
    private $participant;

    /**
     * @var Prize
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Prize")
     *
     * @JMS\Groups({"basic"})
     */
    private $prize;


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
     * @return Participant
     */
    public function getParticipant(): ?Participant
    {
        return $this->participant;
    }

    /**
     * @param Participant $participant
     */
    public function setParticipant(Participant $participant): void
    {
        $this->participant = $participant;
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
}