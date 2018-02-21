<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20180221211516 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('CREATE TABLE event_bundle_pharmacy_participant (id SERIAL NOT NULL, pharmacy_id INT DEFAULT NULL, event_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(), PRIMARY KEY(id));');
        $this->addSql('CREATE INDEX IDX_40DDC8CB8A94ABE2 ON event_bundle_pharmacy_participant (pharmacy_id)');
        $this->addSql('CREATE INDEX IDX_40DDC8CB71F7E88B ON event_bundle_pharmacy_participant (event_id)');
//        $this->addSql('CREATE UNIQUE INDEX uniq_event_bundle_pharmacy ON event_bundle_pharmacy_participant (pharmacy_id, event_id)');
        $this->addSql('ALTER TABLE event_bundle_pharmacy_participant ADD CONSTRAINT FK_40DDC8CB8A94ABE2 FOREIGN KEY (pharmacy_id) REFERENCES event_bundle_pharmacy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_bundle_pharmacy_participant ADD CONSTRAINT FK_40DDC8CB71F7E88B FOREIGN KEY (event_id) REFERENCES event_bundle_event (id) NOT DEFERRABLE INITIALLY IMMEDIATE');

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
