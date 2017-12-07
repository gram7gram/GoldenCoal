<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20171207170004 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('ALTER TABLE event_bundle_address ALTER city DROP NOT NULL');
        $this->addSql('ALTER TABLE event_bundle_address ALTER street DROP NOT NULL');
        $this->addSql('ALTER TABLE event_bundle_pharmacy ALTER okpo DROP NOT NULL');
        $this->addSql('ALTER TABLE event_bundle_pharmacy ALTER name DROP NOT NULL');
        $this->addSql('ALTER TABLE event_bundle_pharmacy ALTER number DROP NOT NULL');

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
