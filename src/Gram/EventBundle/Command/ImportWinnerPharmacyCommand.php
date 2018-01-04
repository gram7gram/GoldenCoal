<?php

namespace Gram\EventBundle\Command;

use Gram\EventBundle\Entity\Address;
use Gram\EventBundle\Entity\Event;
use Gram\EventBundle\Entity\Pharmacy;
use Gram\EventBundle\Entity\Prize;
use Gram\EventBundle\Entity\Region;
use Gram\EventBundle\Entity\WinnerPharmacy;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ImportWinnerPharmacyCommand extends ContainerAwareCommand
{
    use Memory;

    const NAME = 'gram:winner-pharmacy:import';

    protected function configure()
    {
        $this->setName(self::NAME)
            ->addOption('file', null, InputOption::VALUE_REQUIRED, 'Path to csv file')
            ->addOption('code', null, InputOption::VALUE_REQUIRED, 'Event code');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $file = $input->getOption('file');

        if (!$file) {
            $output->writeln('[-] Missing --file');
            exit(1);
        }

        $code = $input->getOption('code');

        if (!$code) {
            $output->writeln('[-] Missing --code');
            exit(1);
        }

        $output->writeln('[+] ' . date('H:i:s') . ' ' . $this->memory() . ' Started');

        $em = $this->getContainer()->get('doctrine')->getManager();

        $handle = fopen($file, 'r');

        $lines = fgetcsv($handle);
        if (!$lines) {
            $output->writeln('[-] Nothing to import');
            exit(1);
        }

        $count = 0;
        while (($row = fgetcsv($handle)) !== FALSE) {
            ++$count;

            $name = mb_strtoupper(trim($row[0]), 'utf8');
            $regionName = mb_strtoupper(trim($row[1]), 'utf8');
            $cityName = mb_strtoupper(trim($row[2]), 'utf8');
            $streetName = mb_strtoupper(trim($row[3]), 'utf8');
            $prizeId = intval(trim($row[4]));

            $address = new Address();
            $address->setRegionName($regionName);
            $address->setCity($cityName);
            $address->setStreet($streetName);

            $em->persist($address);

            $pharmacy = new Pharmacy();
            $pharmacy->setAddress($address);
            $pharmacy->setName($name);

            $em->persist($pharmacy);

            $event = $em->getRepository(Event::class)->findOneBy([
                'code' => $code
            ]);
            $prize = $em->getRepository(Prize::class)->find($prizeId);

            $winner = new WinnerPharmacy();
            $winner->setPharmacy($pharmacy);
            $winner->setPrize($prize);
            $winner->setEvent($event);

            $em->persist($winner);

            $em->flush();

            $em->clear();

            $output->writeln('[+] ' . date('H:i:s') . ' ' . $this->memory() . ' #' . $count);
        }

        fclose($handle);

        $output->writeln('[+] ' . date('H:i:s') . ' ' . $this->memory() . ' Finished');
    }
}