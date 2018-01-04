<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity()
 * @ORM\Table(name="event_bundle_winner_request")
 */
class WinnerRequest
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
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Pharmacy")
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

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $firstName;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $lastName;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=16, nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $phone;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $city;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $destination;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $comment;

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
     * @return string
     */
    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    /**
     * @param string $firstName
     */
    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    /**
     * @return string
     */
    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @return string
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getPhone(): ?string
    {
        return $this->phone;
    }

    /**
     * @param string $phone
     */
    public function setPhone(string $phone): void
    {
        $this->phone = $phone;
    }

    /**
     * @return string
     */
    public function getCity(): ?string
    {
        return $this->city;
    }

    /**
     * @param string $city
     */
    public function setCity(string $city): void
    {
        $this->city = $city;
    }

    /**
     * @return string
     */
    public function getDestination(): ?string
    {
        return $this->destination;
    }

    /**
     * @param string $destination
     */
    public function setDestination(string $destination): void
    {
        $this->destination = $destination;
    }

    /**
     * @return string
     */
    public function getComment(): ?string
    {
        return $this->comment;
    }

    /**
     * @param string $comment
     */
    public function setComment(string $comment): void
    {
        $this->comment = $comment;
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