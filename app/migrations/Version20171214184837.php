<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20171214184837 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('CREATE TABLE event_bundle_winner_pharmacy (id SERIAL NOT NULL, event_id INT NOT NULL, pharmacy_id INT NOT NULL, prize_id INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_56155F958A94ABE2 ON event_bundle_winner_pharmacy (pharmacy_id)');
        $this->addSql('CREATE INDEX IDX_56155F95BBE43214 ON event_bundle_winner_pharmacy (prize_id)');
        $this->addSql('CREATE INDEX IDX_56155F9571F7E88B ON event_bundle_winner_pharmacy (event_id)');
        $this->addSql('ALTER TABLE event_bundle_winner_pharmacy ADD CONSTRAINT FK_56155F958A94ABE2 FOREIGN KEY (pharmacy_id) REFERENCES event_bundle_pharmacy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_bundle_winner_pharmacy ADD CONSTRAINT FK_56155F95BBE43214 FOREIGN KEY (prize_id) REFERENCES event_bundle_prize (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_bundle_winner_pharmacy ADD CONSTRAINT FK_56155F9571F7E88B FOREIGN KEY (event_id) REFERENCES event_bundle_event (id) NOT DEFERRABLE INITIALLY IMMEDIATE');

        $this->addSql('ALTER TABLE event_bundle_pharmacy ALTER event_codes_amount DROP DEFAULT');
        $this->addSql('ALTER TABLE event_bundle_prize ADD image VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE event_bundle_prize ADD importance SMALLINT DEFAULT 0 NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
