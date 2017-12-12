<?php

namespace Gram\EventBundle\Command;

use Gram\EventBundle\Entity\Address;
use Gram\EventBundle\Entity\Pharmacy;
use Gram\EventBundle\Entity\Region;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ImportPharmacyCommand extends ContainerAwareCommand
{
    use Memory;

    const NAME = 'gram:pharmacy:import';

    protected function configure()
    {
        $this->setName(self::NAME)
            ->addOption('file', null, InputOption::VALUE_REQUIRED, 'Path to csv file');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $file = $input->getOption('file');

        if (!$file) {
            $output->writeln('[-] Missing --file');
            exit(1);
        }

        $output->writeln('[+] ' . date('H:i:s') . ' ' . $this->memory() . ' Started');

        $em = $this->getContainer()->get('doctrine')->getManager();

        $regionRepo = $em->getRepository(Region::class);
        $pharmacyRepo = $em->getRepository(Pharmacy::class);
        $addressyRepo = $em->getRepository(Address::class);

        $handle = fopen($file, 'r');

        $lines = fgetcsv($handle);
        if (!$lines) {
            $output->writeln('[-] Nothing to import');
            exit(1);
        }

        $count = 0;
        while (($row = fgetcsv($handle)) !== FALSE) {
            $regionName = mb_strtoupper(trim($row[0]) . ' область', 'utf8');
            $cityName = mb_strtoupper(trim($row[1]), 'utf8');
            $name = mb_strtoupper(trim($row[2]), 'utf8');
            $streetName = mb_strtoupper(trim($row[3]), 'utf8');
            $evenCodes = intval(trim($row[4]));

            $regions = $regionRepo->findByFilter([
                'search' => $regionName
            ], 1, 1);
            if (count($regions) !== 1) {
                throw new \Exception("Region was not found by name '$regionName'", 404);
            }

            $region = $regions[0];

            $address = $addressyRepo->findOneBy([
                'region' =>$region,
                'city' => $cityName,
                'street' => $streetName,
            ]);
            if (!$address) {

                $address = new Address();
                $address->setRegion($region);
                $address->setCity($cityName);
                $address->setStreet($streetName);

                $em->persist($address);
            } else {
                $dublicate = $pharmacyRepo->findOneBy([
                    'address' => $address,
                    'name' => $name,
                ]);

                if ($dublicate) {
                    $output->writeln('[+] Found dublicate at #' . $count . ' => ' . $name);
                    continue;
                }
            }

            $pharmacy = new Pharmacy();
            $pharmacy->setAddress($address);
            $pharmacy->setName($name);
            $pharmacy->setEventCodesAmount($evenCodes);

            $em->persist($pharmacy);

            $em->flush();

            $em->clear();

            $output->writeln('[+] ' . date('H:i:s') . ' ' . $this->memory() . ' #' . (++$count));
        }

        fclose($handle);

        $output->writeln('[+] ' . date('H:i:s') . ' ' . $this->memory() . ' Finished');
    }
}