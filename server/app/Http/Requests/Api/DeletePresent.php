<?php

namespace App\Http\Requests\Api;

class DeletePresent extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $present = $this->route('present');

        return $present->user_id == auth()->id();
    }
}
