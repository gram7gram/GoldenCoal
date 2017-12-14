<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity(repositoryClass="Gram\EventBundle\Entity\PrizeRepository", readOnly=true)
 * @ORM\Table(name="event_bundle_prize")
 */
class Prize
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
     * @var int
     *
     * @ORM\Column(type="smallint", nullable=false, options={"default":0})
     *
     * @JMS\Groups({"basic"})
     */
    private $importance;

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
     * @ORM\Column(type="string", nullable=false)
     *
     * @JMS\Groups({"basic"})
     */
    private $image;

    /**
     * @var Event
     *
     * @ORM\ManyToOne(targetEntity="Gram\EventBundle\Entity\Event")
     * @ORM\JoinColumn(nullable=false)
     */
    private $event;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->importance = 0;
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
     * @return string
     */
    public function getImage(): ?string
    {
        return $this->image;
    }

    /**
     * @param string $image
     */
    public function setImage(string $image): void
    {
        $this->image = $image;
    }

    /**
     * @return int
     */
    public function getImportance(): ?int
    {
        return $this->importance;
    }

    /**
     * @param int $importance
     */
    public function setImportance(int $importance): void
    {
        $this->importance = $importance;
    }

}