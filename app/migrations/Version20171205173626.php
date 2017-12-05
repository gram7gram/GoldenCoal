<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20171205173626 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql("INSERT INTO event_bundle_position (created_at, name) VALUES (NOW(), 'Власник')");
        $this->addSql("INSERT INTO event_bundle_position (created_at, name) VALUES (NOW(), 'Директор')");
        $this->addSql("INSERT INTO event_bundle_position (created_at, name) VALUES (NOW(), 'Менеджер')");
        $this->addSql("INSERT INTO event_bundle_position (created_at, name) VALUES (NOW(), 'Завідуючий')");
        $this->addSql("INSERT INTO event_bundle_position (created_at, name) VALUES (NOW(), 'Провізор')");
        $this->addSql("INSERT INTO event_bundle_position (created_at, name) VALUES (NOW(), 'Фармацевт')");
        $this->addSql("INSERT INTO event_bundle_position (created_at, name) VALUES (NOW(), 'Інше')");
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
