<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity()
 * @ORM\Table(name="event_bundle_address")
 */
class Address
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
     * @var Region
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Region")
     *
     * @JMS\Groups({"basic"})
     */
    private $region;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $regionName;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $city;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $street;


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
     * @return Region
     */
    public function getRegion(): ?Region
    {
        return $this->region;
    }

    /**
     * @param Region $region
     */
    public function setRegion(Region $region = null)
    {
        $this->region = $region;
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
    public function setCity(string $city = null)
    {
        $this->city = $city;
    }

    /**
     * @return string
     */
    public function getStreet(): ?string
    {
        return $this->street;
    }

    /**
     * @param string $street
     */
    public function setStreet(string $street = null)
    {
        $this->street = $street;
    }

    /**
     * @return string
     */
    public function getRegionName(): ?string
    {
        return $this->regionName;
    }

    /**
     * @param string $regionName
     */
    public function setRegionName(string $regionName): void
    {
        $this->regionName = $regionName;
    }
}