<?php

namespace App\Http\Controllers\Api;

use App\Lunamaker\Paginate\Paginate;
use App\Lunamaker\Transformers\PresentTransformer;

class FeedController extends ApiController
{
    /**
     * FeedController constructor.
     *
     * @param PresentTransformer $transformer
     */
    public function __construct(PresentTransformer $transformer)
    {
        $this->transformer = $transformer;

        $this->middleware('auth.api');
    }

    /**
     * Get all the presents of users that are followed by the authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = auth()->user();

        $presents = new Paginate($user->feed());

        return $this->respondWithPagination($presents);
    }
}
