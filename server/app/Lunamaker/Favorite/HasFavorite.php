<?php

namespace App\Lunamaker\Favorite;

use App\Present;

trait HasFavorite
{
    /**
     * Favorite the given present.
     *
     * @param Present $present
     * @return mixed
     */
    public function favorite(Present $present)
    {
        if (! $this->hasFavorited($present))
        {
            return $this->favorites()->attach($present);
        }
    }

    /**
     * Unfavorite the given present.
     *
     * @param Present $present
     * @return mixed
     */
    public function unFavorite(Present $present)
    {
        return $this->favorites()->detach($present);
    }

    /**
     * Get the presents favorited by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function favorites()
    {
        return $this->belongsToMany(Present::class, 'favorites', 'user_id', 'present_id')->withTimestamps();
    }

    /**
     * Check if the user has favorited the given present.
     *
     * @param Present $present
     * @return bool
     */
    public function hasFavorited(Present $present)
    {
        return !! $this->favorites()->where('present_id', $present->id)->count();
    }
}
