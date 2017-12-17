<?php

namespace Gram\EventBundle\Controller;

use Gram\EventBundle\Entity\Participant;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class ExportController extends Controller
{

    public function getsAction(Request $request)
    {
        $token = $request->query->get('access_token', null);

        if (!$token) {
            return new Response('Who are you?', Response::HTTP_FORBIDDEN);
        }

        $validToken = $this->getParameter('participants_export_token');

        if ($token !== $validToken) {
            return new Response('I do not know you!', Response::HTTP_UNAUTHORIZED);
        }

        $service = $this->get('event.participant_service');

        $tmpFileName = md5(uniqid()) . '.csv';
        $tmpFile = '/tmp/' . $tmpFileName;

        $entities = $service->getEntities();

        if (count($entities) === 0) {
            return new Response('There are no participants yet', Response::HTTP_OK);
        }

        $file = fopen($tmpFile, 'w');
        fputcsv($file, [
            'Event',
            'ID',
            'Created at',
            'Email',
            'First name',
            'Last name',
            'Legal name',
            'Position',
            'EDRPOU',
            'Pharmacy type',
            'Pharmacy name',
            'Pharmacy number',
            'Region',
            'City',
            'Street',
        ]);

        /** @var Participant $entity */
        foreach ($entities as $entity) {
            $phar = $entity->getPharmacy();
            $ad = $entity->getAddress();

            fputcsv($file, [
                $entity->getEvent()->getCode(),
                $entity->getId(),
                $entity->getCreatedAt()->format('d.m.Y H:i:s'),
                $entity->getEmail(),
                $entity->getLastName(),
                $entity->getFirstName(),
                $entity->getLegalName(),
                $entity->getPosition() ? $entity->getPosition()->getName() : '',
                $phar && $phar->getOkpo() ? $phar->getOkpo() : '-',
                $phar && $phar->getType() ? $phar->getType()->getName() : '-',
                $phar && $phar->getName() ? $phar->getName() : '-',
                $phar && $phar->getNumber() ? $phar->getNumber() : '-',
                $ad && $ad->getRegion() ? $ad->getRegion()->getName() : '-',
                $ad && $ad->getCity() ? $ad->getCity() : '-',
                $ad && $ad->getStreet() ? $ad->getStreet() : '-',
            ]);
        }

        fclose($file);

        $response =  new BinaryFileResponse($tmpFile);
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $tmpFileName
        );
        return $response;
    }
}
