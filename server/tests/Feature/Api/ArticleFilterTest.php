<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class PresentFilterTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_returns_an_empty_array_of_presents_when_no_presents_exist_with_the_tag_or_an_invalid_tag()
    {
        $response = $this->getJson('/api/presents?tag=test');

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [],
                'presentsCount' => 0
            ]);

        $response = $this->getJson('/api/presents?tag=somerandomtag');

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [],
                'presentsCount' => 0
            ]);
    }

    /** @test */
    public function it_returns_the_presents_with_the_tag_along_with_correct_total_present_count()
    {
        $tags = factory(\App\Tag::class)->times(2)->create();

        $presents = $this->user->presents()
            ->saveMany(factory(\App\Present::class)->times(3)->make())
            ->each(function ($present) use ($tags) {
                $present->tags()->attach($tags);
            });

        $this->user->presents()->saveMany(factory(\App\Present::class)->times(5)->make());

        $response = $this->getJson("/api/presents?tag={$tags[0]->name}");

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [
                    [
                        'slug' => $presents[2]->slug,
                        'title' => $presents[2]->title,
                        'tagList' => $presents[2]->tagList,
                    ],
                    [
                        'slug' => $presents[1]->slug,
                        'title' => $presents[1]->title,
                        'tagList' => $presents[1]->tagList,
                    ],
                    [
                        'slug' => $presents[0]->slug,
                        'title' => $presents[0]->title,
                        'tagList' => $presents[0]->tagList,
                    ],
                ],
                'presentsCount' => 3
            ]);
    }

    /** @test */
    public function it_returns_an_empty_array_of_presents_when_no_presents_exist_by_the_author_or_invalid_author()
    {
        $response = $this->getJson('/api/presents?author=test');

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [],
                'presentsCount' => 0
            ]);

        $response = $this->getJson('/api/presents?author=somerandomtag');

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [],
                'presentsCount' => 0
            ]);
    }

    /** @test */
    public function it_returns_the_presents_by_the_author_along_with_correct_total_present_count()
    {
        $presents = $this->user->presents()->saveMany(factory(\App\Present::class)->times(3)->make());
        $this->loggedInUser->presents()->saveMany(factory(\App\Present::class)->times(5)->make());

        $response = $this->getJson("/api/presents?author={$this->user->username}");

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [
                    [
                        'slug' => $presents[2]->slug,
                        'title' => $presents[2]->title,
                        'author' => [
                            'username' => $this->user->username
                        ]
                    ],
                    [
                        'slug' => $presents[1]->slug,
                        'title' => $presents[1]->title,
                        'author' => [
                            'username' => $this->user->username
                        ]
                    ],
                    [
                        'slug' => $presents[0]->slug,
                        'title' => $presents[0]->title,
                        'author' => [
                            'username' => $this->user->username
                        ]
                    ],
                ],
                'presentsCount' => 3
            ]);
    }

    /** @test */
    public function it_returns_an_empty_array_of_presents_when_no_favorited_presents_exist_for_a_user_or_invalid_user()
    {
        $response = $this->getJson("/api/presents?favorited={$this->user->username}");

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [],
                'presentsCount' => 0
            ]);

        $response = $this->getJson('/api/presents?favorited=somerandomuser');

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [],
                'presentsCount' => 0
            ]);
    }

    /** @test */
    public function it_returns_the_presents_favorited_by_the_user_along_with_correct_total_present_count()
    {
        $presents = $this->loggedInUser->presents()->saveMany(factory(\App\Present::class)->times(5)->make());
        $this->user->favorite($presents[0]);
        $this->user->favorite($presents[2]);
        $this->user->favorite($presents[4]);

        $response = $this->getJson("/api/presents?favorited={$this->user->username}");

        $response->assertStatus(200)
            ->assertJson([
                'presents' => [
                    [
                        'slug' => $presents[4]->slug,
                        'title' => $presents[4]->title,
                        'author' => [
                            'username' => $this->loggedInUser->username
                        ]
                    ],
                    [
                        'slug' => $presents[2]->slug,
                        'title' => $presents[2]->title,
                        'author' => [
                            'username' => $this->loggedInUser->username
                        ]
                    ],
                    [
                        'slug' => $presents[0]->slug,
                        'title' => $presents[0]->title,
                        'author' => [
                            'username' => $this->loggedInUser->username
                        ]
                    ],
                ],
                'presentsCount' => 3
            ]);
    }
}
