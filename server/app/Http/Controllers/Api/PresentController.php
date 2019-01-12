<?php

namespace App\Http\Controllers\Api;

use App\Tag;
use App\Present;
use App\Image;
use App\PresentContact;
use App\Lunamaker\Paginate\Paginate;
use App\Lunamaker\Filters\PresentFilter;
use App\Http\Requests\Api\CreatePresent;
use App\Http\Requests\Api\UpdatePresent;
use App\Http\Requests\Api\DeletePresent;
use App\Lunamaker\Transformers\PresentTransformer;

class PresentController extends ApiController
{
    /**
     * PresentController constructor.
     *
     * @param PresentTransformer $transformer
     */
    public function __construct(PresentTransformer $transformer)
    {
        $this->transformer = $transformer;

        $this->middleware('auth.api')->except(['index', 'show']);
        $this->middleware('auth.api:optional')->only(['index', 'show']);
    }

    /**
     * Get all the presents.
     *
     * @param PresentFilter $filter
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(PresentFilter $filter)
    {
        $presents = new Paginate(Present::loadRelations()->filter($filter));

        return $this->respondWithPagination($presents);
    }

    /**
     * Create a new present and return the present if successful.
     *
     * @param CreatePresent $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreatePresent $request)
    {
        $user = auth()->user();

        $present = $user->presents()->create([
            'title' => $request->input('present.title'),
            'description' => $request->input('present.description'),
            'body' => $request->input('present.body'),
            'price' => $request->input('present.price'),
        ]);

        $inputTags = $request->input('present.tagList');

        if ($inputTags && ! empty($inputTags)) {

            $tags = array_map(function($name) {
                return Tag::firstOrCreate(['name' => $name])->id;
            }, $inputTags);

            $present->tags()->attach($tags);
        }

        $inputImages = $request->input('present.images');

        if ($inputImages && !empty($inputImages)) {
            foreach ($inputImages as $image) {
                Image::firstOrCreate([
                    'url' => $image,
                    'present_id' => $present->id,
                ]);
            }
        }

        $inputContacts = $request->input('present.contacts');

        if ($inputContacts && !empty($inputContacts)) {
            foreach ($inputContacts as $contact) {
                PresentContact::firstOrCreate([
                    'value' => $contact->value,
                    'present_id' => $present->id,
                    'type' => $contact->type,
                ]);
            }
        }

        return $this->respondWithTransformer($present);
    }

    /**
     * Get the present given by its slug.
     *
     * @param Present $present
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Present $present)
    {
        return $this->respondWithTransformer($present);
    }

    /**
     * Update the present given by its slug and return the present if successful.
     *
     * @param UpdatePresent $request
     * @param Present $present
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdatePresent $request, Present $present)
    {
        if ($request->has('present')) {
            $present->update($request->get('present'));
        }

        return $this->respondWithTransformer($present);
    }

    /**
     * Delete the present given by its slug.
     *
     * @param DeletePresent $request
     * @param Present $present
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(DeletePresent $request, Present $present)
    {
        $present->delete();

        return $this->respondSuccess();
    }
}
