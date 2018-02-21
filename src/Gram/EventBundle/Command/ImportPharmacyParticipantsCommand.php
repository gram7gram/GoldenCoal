<?php

namespace Gram\EventBundle\Command;

use Gram\EventBundle\Entity\Address;
use Gram\EventBundle\Entity\Event;
use Gram\EventBundle\Entity\Pharmacy;
use Gram\EventBundle\Entity\PharmacyParticipant;
use Gram\EventBundle\Entity\Region;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ImportPharmacyParticipantsCommand extends ContainerAwareCommand
{
    use Memory;

    const NAME = 'gram:pharmacy-participant:import';

    protected function configure()
    {
        $this->setName(self::NAME)
            ->addOption('code', null, InputOption::VALUE_REQUIRED, 'Event code')
            ->addOption('file', null, InputOption::VALUE_REQUIRED, 'Path to csv file');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $file = $input->getOption('file');
        $code = $input->getOption('code');

        if (!$file) {
            $output->writeln('[-] Missing --file');
            exit(1);
        }

        $output->writeln('[+] ' . date('H:i:s') . ' ' . $this->memory() . ' Started');

        $em = $this->getContainer()->get('doctrine')->getManager();

        $regionRepo = $em->getRepository(Region::class);
        $eventRepo = $em->getRepository(Event::class);

        $handle = fopen($file, 'r');

        $lines = fgetcsv($handle);
        if (!$lines) {
            $output->writeln('[-] Nothing to import');
            exit(1);
        }

        $count = 0;
        while (($row = fgetcsv($handle)) !== FALSE) {

            /** @var Event $event */
            $event = $eventRepo->findOneBy([
                'code' => $code
            ]);
            if (!$event) {
                throw new \Exception("Event was not found", 404);
            }

            ++$count;

            $regionName = mb_strtolower(trim($row[0]) . ' область', 'utf8');
            $cityName = mb_strtoupper(trim($row[1]), 'utf8');
            $streetName = mb_strtoupper(trim($row[2]), 'utf8');
            $name = mb_strtoupper(trim($row[3]), 'utf8');
            $evenCodes = intval(trim($row[4]));

            $region = $regionRepo->createQueryBuilder('r')
                ->where('lower(r.name) = :search')
                ->setParameter('search', $regionName)
                ->getQuery()
                ->getSingleResult();
            if (!$region) {
                throw new \Exception("Region was not found by name '$regionName'", 404);
            }

            $address = new Address();
            $address->setRegion($region);
            $address->setCity($cityName);
            $address->setStreet($streetName);

            $em->persist($address);

            $pharmacy = new Pharmacy();
            $pharmacy->setAddress($address);
            $pharmacy->setName($name);
            $pharmacy->setEventCodesAmount($evenCodes);

            $em->persist($pharmacy);

            $participant = new PharmacyParticipant();
            $participant->setPharmacy($pharmacy);
            $participant->setEvent($event);

            $em->persist($participant);

            $em->flush();

            $em->clear();

            $output->writeln('[+] ' . date('H:i:s') . ' ' . $this->memory() . ' #' . $count);
        }

        fclose($handle);

        $output->writeln('[+] ' . date('H:i:s') . ' ' . $this->memory() . ' Finished');
    }
}