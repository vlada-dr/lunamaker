<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Konekt\Enum\Eloquent\CastsEnums;

class PresentContact extends Model
{
    use CastsEnums;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type', 'value', 'present_id'
    ];

    protected $enums = [
        'type' => ContactType::class
    ];

    /**
     * Get the present that owns the comment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function present()
    {
        return $this->belongsTo(Present::class);
    }
}
