<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity(repositoryClass="Gram\EventBundle\Entity\PharmacyRepository")
 * @ORM\Table(name="event_bundle_pharmacy", uniqueConstraints={
 *     @ORM\UniqueConstraint(name="uniq_event_bundle_pharmacy", columns={"address_id", "name"})
 * })
 */
class Pharmacy {

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
     * @var Address
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Address")
     *
     * @JMS\Groups({"basic"})
     */
    private $address;

    /**
     * @var int
     *
     * @ORM\Column(type="smallint", nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $eventCodesAmount;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=16, nullable=true, unique=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $okpo;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $number;

    /**
     * @var PharmacyType
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\PharmacyType")
     * @ORM\JoinColumn(nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $type;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->eventCodesAmount = 0;
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
    public function getOkpo(): ?string
    {
        return $this->okpo;
    }

    /**
     * @param string $okpo
     */
    public function setOkpo(string $okpo = null)
    {
        $this->okpo = $okpo;
    }

    /**
     * @return string
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name = null)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getNumber(): ?string
    {
        return $this->number;
    }

    /**
     * @param string $number
     */
    public function setNumber(string $number = null)
    {
        $this->number = $number;
    }

    /**
     * @return PharmacyType
     */
    public function getType(): ?PharmacyType
    {
        return $this->type;
    }

    /**
     * @param PharmacyType $type
     */
    public function setType(PharmacyType $type = null)
    {
        $this->type = $type;
    }

    /**
     * @return int
     */
    public function getEventCodesAmount(): ?int
    {
        return $this->eventCodesAmount;
    }

    /**
     * @param int $eventCodesAmount
     */
    public function setEventCodesAmount(int $eventCodesAmount = null)
    {
        $this->eventCodesAmount = $eventCodesAmount;
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
    public function setAddress(Address $address = null)
    {
        $this->address = $address;
    }
}