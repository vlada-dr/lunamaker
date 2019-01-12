<?php

namespace App;

use JWTAuth;
use App\Lunamaker\Follow\Followable;
use App\Lunamaker\Favorite\HasFavorite;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Konekt\Enum\Eloquent\CastsEnums;

class User extends Authenticatable
{
    use CastsEnums;

    use Notifiable, Followable, HasFavorite;

    protected $enums = [
        'role' => UserRole::class
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password', 'bio', 'image'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Set the password using bcrypt hash.
     *
     * @param $value
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = (password_get_info($value)['algo'] === 0) ? bcrypt($value) : $value;
    }

    /**
     * Generate a JWT token for the user.
     *
     * @return string
     */
    public function getTokenAttribute()
    {
        return JWTAuth::fromUser($this);
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
     * Get all the presents by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function presents()
    {
        return $this->hasMany(Present::class)->latest();
    }

    /**
     * Get all the comments by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }

    /**
     * Get all the comments by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function contacts()
    {
        return $this->hasMany(UserContact::class)->latest();
    }

    /**
     * Get all the presents of the following users.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function feed()
    {
        $followingIds = $this->following()->pluck('id')->toArray();

        return Present::loadRelations()->whereIn('user_id', $followingIds);
    }

    /**
     * Get the key name for route model binding.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'username';
    }
}
