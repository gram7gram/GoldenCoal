<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity(repositoryClass="Gram\EventBundle\Entity\ParticipantRepository")
 * @ORM\Table(name="event_bundle_participant")
 */
class Participant
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
    private $firstName;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $middleName;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=false, unique=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $legalName;

    /**
     * @var Pharmacy
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Pharmacy")
     *
     * @JMS\Groups({"basic"})
     */
    private $pharmacy;

    /**
     * @var Position
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Position")
     *
     * @JMS\Groups({"basic"})
     */
    private $position;

    /**
     * @var Address
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Address")
     *
     * @JMS\Groups({"basic"})
     */
    private $address;

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
     * @return string
     */
    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName(string $lastName = null)
    {
        $this->lastName = $lastName;
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
    public function setFirstName(string $firstName = null)
    {
        $this->firstName = $firstName;
    }

    /**
     * @return string
     */
    public function getMiddleName(): ?string
    {
        return $this->middleName;
    }

    /**
     * @param string $middleName
     */
    public function setMiddleName(string $middleName = null)
    {
        $this->middleName = $middleName;
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
    public function getLegalName(): ?string
    {
        return $this->legalName;
    }

    /**
     * @param string $legalName
     */
    public function setLegalName(string $legalName = null): void
    {
        $this->legalName = $legalName;
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
    public function setPharmacy(Pharmacy $pharmacy = null): void
    {
        $this->pharmacy = $pharmacy;
    }

    /**
     * @return Address
     */
    public function getAddress(): ?Address
    {
        return $this->address;
    }

    /**
     * @param Address $address
     */
    public function setAddress(Address $address = null): void
    {
        $this->address = $address;
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

    /**
     * @return Position
     */
    public function getPosition(): ?Position
    {
        return $this->position;
    }

    /**
     * @param Position $position
     */
    public function setPosition(Position $position): void
    {
        $this->position = $position;
    }
}