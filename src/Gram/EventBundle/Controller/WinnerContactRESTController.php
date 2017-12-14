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

        if (!(isset($content['email'])
            && isset($content['event'])
            && isset($content['prize'])
            && isset($content['name'])
            && isset($content['pharmacy']))) {
            return new JsonResponse([
                'messsage' => 'missing required parameters'
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $service = $this->get('event.contact_manager_service');

        try {

            $content = $service->requestPrizeFromManager($content);

            return new JsonResponse([
                'items' => $content
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'message' => $e->getMessage()
            ], $e->getCode() > 300 ? $e->getCode() : JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
