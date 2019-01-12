<?php

namespace App\Http\Requests\Api;

class UpdatePresent extends ApiRequest
{
    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    protected function validationData()
    {
        return $this->get('present') ?: [];
    }

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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:255',
            'body' => 'sometimes|string',
            'tagList' => 'sometimes|array',
            'images' => 'sometimes|array',
            'contacts' => 'sometimes|array',
        ];
    }
}
