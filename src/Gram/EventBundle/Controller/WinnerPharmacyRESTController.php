<?php

namespace Gram\EventBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class WinnerPharmacyRESTController extends Controller
{

    /**
     * @ApiDoc(
     *      section="Winner pharmacy",
     *      description="Get winner pharmacies",
     *      method="GET",
     *      statusCodes={
     *          200 = "",
     *          401 = "",
     *          500 = "",
     *      }
     * )
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function getsAction(Request $request, $id)
    {
        $page = intval($request->get('page', 1));
        $limit = intval($request->get('limit', 1));
        $filter = $request->get('filter', []);

        $service = $this->get('event.winner_pharmacy_service');
        $prizeService = $this->get('event.prize_service');
        $eventService = $this->get('event.event_service');

        try {

            $event = $eventService->getEntity($id);
            if (!$event) {
                throw new \Exception('Event was not found', JsonResponse::HTTP_NOT_FOUND);
            }

            $eventContent = $eventService->serialize($event);

            $prizes = $prizeService->getEntities([
                'event' => [
                    'id' => $id
                ]
            ]);
            $prizeItems = $prizeService->serialize($prizes);

            $total = $service->getCount($filter);
            $items = [];

            if ($total > 0) {
                $entities = $service->getEntities($filter, $page, $limit);
                $items = $service->serialize($entities);
            }

            return new JsonResponse([
                'total' => $total,
                'count' => count($items),
                'page' => $page,
                'limit' => $limit,
                'items' => $items,
                'metadata' =>[
                    'event' => $eventContent,
                    'prizes' => [
                        'count' => count($prizeItems),
                        'items' => $prizeItems
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'message' => $e->getMessage()
            ], $e->getCode() > 300 ? $e->getCode() : JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
