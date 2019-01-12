<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class FeedTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_returns_an_empty_array_of_presents_when_user_does_not_follow_anyone()
    {
        $response = $this->getJson('/api/presents/feed', $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [],
                'presentsCount' => 0
            ]);
    }

    /** @test */
    public function it_returns_presents_of_users_followed_by_the_logged_in_user()
    {
        $presents = $this->user->presents()->saveMany(factory(\App\Present::class)->times(2)->make());

        $this->loggedInUser->follow($this->user);

        $response = $this->getJson('/api/presents/feed', $this->headers);

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
                            'following' => true,
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
    public function it_returns_the_correct_feed_presents_with_limit_and_offset()
    {
        $this->user->presents()->saveMany(factory(\App\Present::class)->times(25)->make());

        $this->loggedInUser->follow($this->user);

        $response = $this->getJson('/api/presents/feed', $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'presentsCount' => 25
            ]);

        $this->assertCount(20, $response->json()['presents'], 'Expected feed to set default limit to 20');

        $this->assertEquals(
            $this->user->presents()->latest()->take(20)->pluck('slug')->toArray(),
            array_column($response->json()['presents'], 'slug'),
            'Expected latest 20 feed presents by default'
        );

        $response = $this->getJson('/api/presents/feed?limit=10&offset=5', $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'presentsCount' => 25
            ]);

        $this->assertCount(10, $response->json()['presents'], 'Expected feed limit of 10 when set');

        $this->assertEquals(
            $this->user->presents()->latest()->skip(5)->take(10)->pluck('slug')->toArray(),
            array_column($response->json()['presents'], 'slug'),
            'Expected latest 10 feed presents with 5 offset'
        );
    }

    /** @test */
    public function it_returns_the_feed_presents_with_appropriate_favorite_and_following_fields()
    {
        $present = $this->user->presents()->save(factory(\App\Present::class)->make());

        $this->loggedInUser->follow($this->user);

        $response = $this->getJson('/api/presents/feed', $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [
                    [
                        'slug' => $present->slug,
                        'favorited' => false,
                        'favoritesCount' => 0,
                        'author' => [
                            'username' => $this->user->username,
                            'following' => true,
                        ]
                    ],
                ]
            ]);

        $this->loggedInUser->favorite($present);

        $response = $this->getJson('/api/presents/feed', $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [
                    [
                        'slug' => $present->slug,
                        'favorited' => true,
                        'favoritesCount' => 1,
                        'author' => [
                            'username' => $this->user->username,
                            'following' => true,
                        ]
                    ],
                ]
            ]);
    }

    /** @test */
    public function it_returns_an_unauthorized_error_when_trying_to_get_feed_without_logging_in()
    {
        $response = $this->getJson('/api/presents/feed');

        $response->assertStatus(401);
    }
}
