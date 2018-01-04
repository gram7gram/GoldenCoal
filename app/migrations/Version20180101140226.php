<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20180101140226 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('CREATE TABLE event_bundle_winner_request (id SERIAL NOT NULL, pharmacy_id INT NOT NULL, prize_id INT NOT NULL, event_id INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(16) NOT NULL, city TEXT NOT NULL, destination TEXT NOT NULL, comment TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8AF3CF0ABBE43214 ON event_bundle_winner_request (prize_id)');
        $this->addSql('CREATE INDEX IDX_8AF3CF0A71F7E88B ON event_bundle_winner_request (event_id)');
        $this->addSql('CREATE INDEX IDX_8AF3CF0A8A94ABE2 ON event_bundle_winner_request (pharmacy_id)');
        $this->addSql('ALTER TABLE event_bundle_winner_request ADD CONSTRAINT FK_8AF3CF0A8A94ABE2 FOREIGN KEY (pharmacy_id) REFERENCES event_bundle_pharmacy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_bundle_winner_request ADD CONSTRAINT FK_8AF3CF0ABBE43214 FOREIGN KEY (prize_id) REFERENCES event_bundle_prize (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_bundle_winner_request ADD CONSTRAINT FK_8AF3CF0A71F7E88B FOREIGN KEY (event_id) REFERENCES event_bundle_event (id) NOT DEFERRABLE INITIALLY IMMEDIATE');

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
