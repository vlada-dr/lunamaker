<?php

namespace App\Http\Requests\Api;

class CreatePresent extends ApiRequest
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
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'body' => 'required|string',
            'price' => 'sometimes|integer',
            'tagList' => 'sometimes|array',
            'images' => 'sometimes|array',
            'contacts' => 'sometimes|array',
        ];
    }
}
