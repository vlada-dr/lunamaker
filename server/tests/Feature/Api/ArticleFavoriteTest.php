<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class PresentFavoriteTest extends TestCase
{
    use DatabaseMigrations;

    protected $present;

    public function setUp()
    {
        parent::setUp();

        $this->present = $this->user->presents()->save(factory(\App\Present::class)->make());
    }

    /** @test */
    public function it_returns_the_present_favorite_properties_accordingly_when_favorited_and_unfavorited()
    {
        $response = $this->postJson("/api/presents/{$this->present->slug}/favorite", [], $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'present' => [
                    'favorited' => true,
                    'favoritesCount' => 1,
                ]
            ]);

        $response = $this->deleteJson("/api/presents/{$this->present->slug}/favorite", [], $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'present' => [
                    'favorited' => false,
                    'favoritesCount' => 0,
                ]
            ]);
    }

    /** @test */
    public function it_returns_the_correct_present_favorite_count_when_favorited_and_unfavorited()
    {
        $response = $this->getJson("/api/presents/{$this->present->slug}");

        $response->assertStatus(200)
            ->assertJson([
                'present' => [
                    'favoritesCount' => 0,
                ]
            ]);

        $this->user->favorite($this->present);

        $response = $this->getJson("/api/presents/{$this->present->slug}");

        $response->assertStatus(200)
            ->assertJson([
                'present' => [
                    'favoritesCount' => 1,
                ]
            ]);

        $response = $this->postJson("/api/presents/{$this->present->slug}/favorite", [], $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'present' => [
                    'favorited' => true,
                    'favoritesCount' => 2,
                ]
            ]);

        $response = $this->deleteJson("/api/presents/{$this->present->slug}/favorite", [], $this->headers);
        $response->assertStatus(200)
            ->assertJson([
                'present' => [
                    'favorited' => false,
                    'favoritesCount' => 1,
                ]
            ]);

        $this->user->unFavorite($this->present);

        $response = $this->getJson("/api/presents/{$this->present->slug}");

        $response->assertStatus(200)
            ->assertJson([
                'present' => [
                    'favoritesCount' => 0,
                ]
            ]);
    }

    /** @test */
    public function it_returns_an_unauthorized_error_when_trying_to_favorite_or_unfavorite_without_logging_in()
    {
        $response = $this->postJson("/api/presents/{$this->present->slug}/favorite");

        $response->assertStatus(401);

        $response = $this->deleteJson("/api/presents/{$this->present->slug}/favorite");

        $response->assertStatus(401);
    }
}
