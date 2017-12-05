<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20171205173608 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Дніпропетровська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Чернігівська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Одеська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Харківська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Житомирська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Полтавська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Херсонська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Київська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Запорізька область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Луганська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Донецька область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Вінницька область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Автономна Республіка Крим', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Миколаївська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Кіровоградська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Сумська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Львівська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Черкаська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Хмельницька область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Волинська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Рівненська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Івано-Франківська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Тернопільська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Закарпатська область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'Чернівецька область', null)");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'м. Севастополь', 'city')");
        $this->addSql("INSERT INTO event_bundle_region (created_at, name, type) VALUES (now(), 'м. Київ', 'city')");

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
