<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Gram\EventBundle\Entity\Event;

class Version20180221211543 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('INSERT INTO event_bundle_pharmacy_participant (pharmacy_id, event_id)
 SELECT id, (SELECT id FROM event_bundle_event WHERE code = \'' . Event::GOLDEN_COAL . '\' LIMIT 1) FROM event_bundle_pharmacy');

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
