<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171204210438 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('CREATE TABLE event_bundle_address (id SERIAL NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, region VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, street VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE event_bundle_event (id SERIAL NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE user_bundle_individual (id SERIAL NOT NULL, pharmacy_id INT DEFAULT NULL, address_id INT DEFAULT NULL, event_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, last_name VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, middle_name VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, legal_name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A2CD7BCAE7927C74 ON user_bundle_individual (email)');
        $this->addSql('CREATE INDEX IDX_A2CD7BCA8A94ABE2 ON user_bundle_individual (pharmacy_id)');
        $this->addSql('CREATE INDEX IDX_A2CD7BCAF5B7AF75 ON user_bundle_individual (address_id)');
        $this->addSql('CREATE INDEX IDX_A2CD7BCA71F7E88B ON user_bundle_individual (event_id)');
        $this->addSql('CREATE TABLE event_bundle_pharmacy (id SERIAL NOT NULL, type_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, okpo VARCHAR(16) NOT NULL, name TEXT NOT NULL, number TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_363D090FF4B119B7 ON event_bundle_pharmacy (okpo)');
        $this->addSql('CREATE INDEX IDX_363D090FC54C8C93 ON event_bundle_pharmacy (type_id)');
        $this->addSql('CREATE TABLE event_bundle_pharmacy_type (id SERIAL NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, name TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE event_bundle_position (id SERIAL NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, name TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE event_bundle_prize (id SERIAL NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE event_bundle_winner (id SERIAL NOT NULL, participant_id INT DEFAULT NULL, prize_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6930F2779D1C3019 ON event_bundle_winner (participant_id)');
        $this->addSql('CREATE INDEX IDX_6930F277BBE43214 ON event_bundle_winner (prize_id)');
        $this->addSql('ALTER TABLE user_bundle_individual ADD CONSTRAINT FK_A2CD7BCA8A94ABE2 FOREIGN KEY (pharmacy_id) REFERENCES event_bundle_pharmacy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_bundle_individual ADD CONSTRAINT FK_A2CD7BCAF5B7AF75 FOREIGN KEY (address_id) REFERENCES event_bundle_address (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_bundle_individual ADD CONSTRAINT FK_A2CD7BCA71F7E88B FOREIGN KEY (event_id) REFERENCES event_bundle_event (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_bundle_pharmacy ADD CONSTRAINT FK_363D090FC54C8C93 FOREIGN KEY (type_id) REFERENCES event_bundle_pharmacy_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_bundle_winner ADD CONSTRAINT FK_6930F2779D1C3019 FOREIGN KEY (participant_id) REFERENCES user_bundle_individual (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_bundle_winner ADD CONSTRAINT FK_6930F277BBE43214 FOREIGN KEY (prize_id) REFERENCES event_bundle_prize (id) NOT DEFERRABLE INITIALLY IMMEDIATE');

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
