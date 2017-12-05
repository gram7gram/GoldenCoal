<?php

namespace Gram\EventBundle\Controller;

use Gram\EventBundle\Entity\Event;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ParticipantRESTController extends Controller
{

    /**
     * @ApiDoc(
     *      section="Participation",
     *      description="Get participants",
     *      method="GET",
     *      statusCodes={
     *          200 = "",
     *          401 = "",
     *          500 = "",
     *      }
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function getsAction(Request $request, $id)
    {
        $page = intval($request->get('page', 1));
        $limit = intval($request->get('limit', 1));
        $filter = $request->get('filter', []);

        $service = $this->get('event.participant_service');

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

    /**
     * @ApiDoc(
     *      section="Participation",
     *      description="Participate in event",
     *      method="POST",
     *      statusCodes={
     *          201 = "",
     *          404 = "",
     *          403 = "",
     *          500 = "",
     *      }
     * )
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function postAction(Request $request, $id)
    {
        $service = $this->get('event.participant_service');

        $em = $this->getDoctrine()->getManager();

        $event = $em->getRepository(Event::class)->find($id);
        if (!$event) {
            return new JsonResponse([
                'message' => 'Not found'
            ], JsonResponse::HTTP_NOT_FOUND);
        }

        if ($event->isExpired()) {
            return new JsonResponse([
                'message' => 'Event has ended'
            ], JsonResponse::HTTP_FORBIDDEN);
        }

//        try {

            $content = json_decode($request->getContent(), true);

            $entity = $service->participate($event, $content);

            $item = $service->serialize($entity);

            return new JsonResponse($item, JsonResponse::HTTP_CREATED);
//        } catch (\Exception $e) {
//            return new JsonResponse([
//                'message' => $e->getMessage()
//            ], $e->getCode() > 300 ? $e->getCode() : JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
//        }
    }
}
