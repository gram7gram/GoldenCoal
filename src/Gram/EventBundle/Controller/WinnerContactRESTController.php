<?php

namespace Gram\EventBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class WinnerContactRESTController extends Controller
{

    /**
     * @ApiDoc(
     *      section="Winner contact",
     *      description="Contact manager to get a prize",
     *      method="POST",
     *      statusCodes={
     *          200 = "",
     *          401 = "",
     *          500 = "",
     *      }
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function postAction(Request $request)
    {
        $content = json_decode($request->getContent(), true);

        $service = $this->get('event.contact_manager_service');
        $winnerService = $this->get('event.winner_request_service');

        try {

            $winnerRequest = $winnerService->create($content);

            $content = $winnerService->serialize($winnerRequest);

            $service->requestPrizeFromManager($winnerRequest);

            return new JsonResponse($content, JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse([
                'message' => $e->getMessage()
            ], $e->getCode() > 300 ? $e->getCode() : JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
