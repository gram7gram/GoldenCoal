<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20171212195207 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('ALTER TABLE event_bundle_pharmacy ADD address_id INT DEFAULT NULL');
        $this->addSql('CREATE INDEX IDX_363D090FF5B7AF75 ON event_bundle_pharmacy (address_id)');
        $this->addSql('ALTER TABLE event_bundle_pharmacy ADD CONSTRAINT FK_363D090FF5B7AF75 FOREIGN KEY (address_id) REFERENCES event_bundle_address (id) NOT DEFERRABLE INITIALLY IMMEDIATE');

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
