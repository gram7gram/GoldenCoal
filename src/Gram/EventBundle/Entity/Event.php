<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity(readOnly=true)
 * @ORM\Table(name="event_bundle_event")
 */
class Event
{

    const GOLDEN_COAL = 'golden-coal';
    const WHITE_COAL = 'white-coal';

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
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=false, length=16, unique=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $code;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $endDate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @JMS\Groups({"basic"})
     */
    private $resultDate;

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
    public function getCode(): ?string
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode(string $code): void
    {
        $this->code = $code;
    }

    /**
     * @return \DateTime
     */
    public function getEndDate(): ?\DateTime
    {
        return $this->endDate;
    }

    /**
     * @param \DateTime $endDate
     */
    public function setEndDate(\DateTime $endDate = null): void
    {
        $this->endDate = $endDate;
    }

    /**
     * @return \DateTime
     */
    public function getResultDate(): ?\DateTime
    {
        return $this->resultDate;
    }

    /**
     * @param \DateTime $resultDate
     */
    public function setResultDate(\DateTime $resultDate): void
    {
        $this->resultDate = $resultDate;
    }

    public function isExpired()
    {
        return !is_null($this->endDate) && $this->endDate <= new \DateTime();
    }
}