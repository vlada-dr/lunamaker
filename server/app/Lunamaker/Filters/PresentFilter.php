<?php

namespace App\Lunamaker\Filters;

use App\Tag;
use App\User;

class PresentFilter extends Filter
{
    /**
     * Filter by author username.
     * Get all the presents by the user with given username.
     *
     * @param $username
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function author($username)
    {
        $user = User::whereUsername($username)->first();

        $userId = $user ? $user->id : null;

        return $this->builder->whereUserId($userId);
    }

    /**
     * Filter by favorited username.
     * Get all the presents favorited by the user with given username.
     *
     * @param $username
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function favorited($username)
    {
        $user = User::whereUsername($username)->first();

        $presentIds = $user ? $user->favorites()->pluck('id')->toArray() : [];

        return $this->builder->whereIn('id', $presentIds);
    }

    /**
     * Filter by tag name.
     * Get all the presents tagged by the given tag name.
     *
     * @param $name
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function tag($name)
    {
        $tag = Tag::whereName($name)->first();

        $presentIds = $tag ? $tag->presents()->pluck('present_id')->toArray() : [];

        return $this->builder->whereIn('id', $presentIds);
    }
}
