<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity()
 * @ORM\Table(name="event_bundle_pharmacy")
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
     * @var string
     *
     * @ORM\Column(type="string", length=16, nullable=false, unique=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $okpo;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $number;

    /**
     * @var PharmacyType
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\PharmacyType")
     *
     * @JMS\Groups({"basic"})
     */
    private $type;

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
    public function getOkpo(): ?string
    {
        return $this->okpo;
    }

    /**
     * @param string $okpo
     */
    public function setOkpo(string $okpo): void
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
    public function setName(string $name): void
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
    public function setNumber(string $number): void
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
    public function setType(PharmacyType $type): void
    {
        $this->type = $type;
    }
}