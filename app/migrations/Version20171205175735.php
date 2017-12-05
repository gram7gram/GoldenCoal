<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Gram\EventBundle\Entity\Event;

class Version20171205175735 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql("INSERT INTO event_bundle_event (created_at, name, code, end_date, result_date) VALUES (NOW(), 'Білий iPad від Білого Вугілля', '" . Event::WHITE_COAL . "', null, null)");
        $this->addSql("INSERT INTO event_bundle_event (created_at, name, code, end_date, result_date) VALUES (NOW(), 'Золотий смартфон від Білого Вугілля', '" . Event::GOLDEN_COAL . "', '2017-12-01 00:00:00', '2017-12-12 00:00:00')");
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
