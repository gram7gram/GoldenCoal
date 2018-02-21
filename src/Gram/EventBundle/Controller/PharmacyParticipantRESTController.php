<?php

namespace Gram\EventBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PharmacyParticipantRESTController extends Controller
{

    /**
     * @ApiDoc(
     *      section="Pharmacy participant",
     *      description="Get pharmacy participants by event",
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

        $service = $this->get('event.pharmacy_participant_service');

        $filter['event'] = $id;

        try {

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
                'items' => $items
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'message' => $e->getMessage()
            ], $e->getCode() > 300 ? $e->getCode() : JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
