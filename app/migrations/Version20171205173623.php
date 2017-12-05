<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20171205173623 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql("INSERT INTO event_bundle_pharmacy_type (created_at, name) VALUES (now(), 'Аптека')");
        $this->addSql("INSERT INTO event_bundle_pharmacy_type (created_at, name) VALUES (now(), 'Аптечний пункт')");

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
