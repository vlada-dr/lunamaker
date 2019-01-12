<?php

namespace App;

use App\Lunamaker\Slug\HasSlug;
use App\Lunamaker\Filters\Filterable;
use App\Lunamaker\Favorite\Favoritable;
use Illuminate\Database\Eloquent\Model;

class Present extends Model
{
    use Favoritable, Filterable, HasSlug;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'body', 'price', 'approved'
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'tags', 'images'
    ];

    /**
     * Get the list of tags attached to the present.
     *
     * @return array
     */
    public function getTagListAttribute()
    {
        return $this->tags->pluck('name')->toArray();
    }

    /**
     * Load all required relationships with only necessary content.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */

    /**
     * Get the list of tags attached to the present.
     *
     * @return array
     */
    public function getImageListAttribute()
    {
        return $this->images->pluck('url')->toArray();
    }

    /**
     * Get the list of tags attached to the present.
     *
     * @return array
     */
    public function getContactListAttribute()
    {
        return $this->contacts->pluck('value')->toArray();
    }

    /**
     * Load all required relationships with only necessary content.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */

    public function scopeLoadRelations($query)
    {
        return $query->with(['user.followers' => function ($query) {
                $query->where('follower_id', auth()->id());
            }])
            ->with(['favorited' => function ($query) {
                $query->where('user_id', auth()->id());
            }])
            ->withCount('favorited');
    }

    /**
     * Get the user that owns the present.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all the comments for the present.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }

    /**
     * Get all the images for the present.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function images()
    {
        return $this->hasMany(Image::class);
    }

    /**
     * Get all the tags that belong to the present.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    /**
     * Get all the images for the present.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function contacts()
    {
        return $this->hasMany(PresentContact::class)->latest();
    }

    /**
     * Get the key name for route model binding.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get the attribute name to slugify.
     *
     * @return string
     */
    public function getSlugSourceColumn()
    {
        return 'title';
    }

    /**
     * Get list of values which are not allowed for this resource
     *
     * @return array
     */
    public function getBannedSlugValues()
    {
        return ['feed'];
    }
}
