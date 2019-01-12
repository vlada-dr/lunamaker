<?php

namespace App\Http\Controllers\Api;

use App\Present;
use App\Comment;
use App\Http\Requests\Api\CreateComment;
use App\Http\Requests\Api\DeleteComment;
use App\Lunamaker\Transformers\CommentTransformer;

class CommentController extends ApiController
{
    /**
     * CommentController constructor.
     *
     * @param CommentTransformer $transformer
     */
    public function __construct(CommentTransformer $transformer)
    {
        $this->transformer = $transformer;

        $this->middleware('auth.api')->except('index');
        $this->middleware('auth.api:optional')->only('index');
    }

    /**
     * Get all the comments of the present given by its slug.
     *
     * @param Present $present
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Present $present)
    {
        $comments = $present->comments()->get();

        return $this->respondWithTransformer($comments);
    }

    /**
     * Add a comment to the present given by its slug and return the comment if successful.
     *
     * @param CreateComment $request
     * @param Present $present
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateComment $request, Present $present)
    {
        $comment = $present->comments()->create([
            'body' => $request->input('comment.body'),
            'user_id' => auth()->id(),
        ]);

        return $this->respondWithTransformer($comment);
    }

    /**
     * Delete the comment given by its id.
     *
     * @param DeleteComment $request
     * @param $present
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(DeleteComment $request, $present, Comment $comment)
    {
        $comment->delete();

        return $this->respondSuccess();
    }
}
