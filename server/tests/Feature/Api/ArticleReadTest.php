<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class PresentReadTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_returns_an_empty_array_of_presents_when_no_presents_exist()
    {
        $response = $this->getJson('/api/presents');

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [],
                'presentsCount' => 0
            ]);
    }

    /** @test */
    public function it_returns_the_presents_and_correct_total_present_count()
    {
        $presents = $this->user->presents()->saveMany(factory(\App\Present::class)->times(2)->make());

        $response = $this->getJson('/api/presents');

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [
                    [
                        'slug' => $presents[1]->slug,
                        'title' => $presents[1]->title,
                        'description' => $presents[1]->description,
                        'body' => $presents[1]->body,
                        'tagList' => $presents[1]->tagList,
                        'createdAt' => $presents[1]->created_at->toAtomString(),
                        'updatedAt' => $presents[1]->updated_at->toAtomString(),
                        'favorited' => false,
                        'favoritesCount' => 0,
                        'author' => [
                            'username' => $this->user->username,
                            'bio' => $this->user->bio,
                            'image' => $this->user->image,
                            'following' => false,
                        ]
                    ],
                    [
                        'slug' => $presents[0]->slug,
                        'title' => $presents[0]->title,
                    ]
                ],
                'presentsCount' => 2
            ]);
    }

    /** @test */
    public function it_returns_the_present_by_slug_if_valid_and_not_found_error_if_invalid()
    {
        $present = $this->user->presents()->save(factory(\App\Present::class)->make());

        $response = $this->getJson("/api/presents/{$present->slug}");

        $response->assertStatus(200)
            ->assertJson([
                'present' => [
                    'slug' => $present->slug,
                    'title' => $present->title,
                    'description' => $present->description,
                    'body' => $present->body,
                    'tagList' => $present->tagList,
                    'createdAt' => $present->created_at->toAtomString(),
                    'updatedAt' => $present->updated_at->toAtomString(),
                    'favorited' => false,
                    'favoritesCount' => 0,
                    'author' => [
                        'username' => $this->user->username,
                        'bio' => $this->user->bio,
                        'image' => $this->user->image,
                        'following' => false,
                    ]
                ]
            ]);

        $response = $this->getJson('/api/presents/randominvalidslug');

        $response->assertStatus(404);
    }

    /** @test */
    public function it_returns_the_correct_following_and_favorited_fields_when_logged_in()
    {
        $present = $this->user->presents()->save(factory(\App\Present::class)->make());

        $this->loggedInUser->follow($this->user);

        $this->loggedInUser->favorite($present);

        $response = $this->getJson('/api/presents');

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [
                    [
                        'slug' => $present->slug,
                        'title' => $present->title,
                        'favorited' => false,
                        'favoritesCount' => 1,
                        'author' => [
                            'username' => $this->user->username,
                            'following' => false,
                        ]
                    ]
                ],
                'presentsCount' => 1
            ]);

        $response = $this->getJson('/api/presents', $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [
                    [
                        'slug' => $present->slug,
                        'title' => $present->title,
                        'favorited' => true,
                        'favoritesCount' => 1,
                        'author' => [
                            'username' => $this->user->username,
                            'following' => true,
                        ]
                    ]
                ],
                'presentsCount' => 1
            ]);
    }
}
