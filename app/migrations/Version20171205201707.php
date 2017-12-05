<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20171205201707 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('ALTER TABLE event_bundle_participant ADD position_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event_bundle_participant ADD CONSTRAINT FK_B9BCB590DD842E46 FOREIGN KEY (position_id) REFERENCES event_bundle_position (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_B9BCB590DD842E46 ON event_bundle_participant (position_id)');

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
