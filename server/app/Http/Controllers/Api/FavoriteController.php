<?php

namespace App\Http\Controllers\Api;

use App\Present;
use App\Lunamaker\Transformers\PresentTransformer;

class FavoriteController extends ApiController
{
    /**
     * FavoriteController constructor.
     *
     * @param PresentTransformer $transformer
     */
    public function __construct(PresentTransformer $transformer)
    {
        $this->transformer = $transformer;

        $this->middleware('auth.api');
    }

    /**
     * Favorite the present given by its slug and return the present if successful.
     *
     * @param Present $present
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Present $present)
    {
        $user = auth()->user();

        $user->favorite($present);

        return $this->respondWithTransformer($present);
    }

    /**
     * Unfavorite the present given by its slug and return the present if successful.
     *
     * @param Present $present
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove(Present $present)
    {
        $user = auth()->user();

        $user->unFavorite($present);

        return $this->respondWithTransformer($present);
    }
}
