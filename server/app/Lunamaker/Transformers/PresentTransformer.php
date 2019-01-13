<?php

namespace App\Lunamaker\Transformers;

class PresentTransformer extends Transformer
{
    protected $resourceName = 'present';

    public function transform($data)
    {
        return [
            'slug'              => $data['slug'],
            'title'             => $data['title'],
            'description'       => $data['description'],
            'body'              => $data['body'],
            'tagList'           => $data['tagList'],
            'createdAt'         => $data['created_at']->toAtomString(),
            'updatedAt'         => $data['updated_at']->toAtomString(),
            'favorited'         => $data['favorited'],
            'favoritesCount'    => $data['favoritesCount'],
            'images'            => $data['imageList'],
            'contacts'          => $data['contactList'],
            'price'             => $data['price'],
            'author' => [
                'username'  => $data['user']['username'],
                'bio'       => $data['user']['bio'],
                'image'     => $data['user']['image'],
                'following' => $data['user']['following'],
            ],
            'approved'          => $data['approved'],
            'comments'          => $data['comments']
        ];
    }
}
