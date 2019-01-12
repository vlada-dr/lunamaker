<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class PresentPaginateTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_returns_the_correct_presents_with_limit_and_offset()
    {
        $this->user->presents()->saveMany(factory(\App\Present::class)->times(25)->make());

        $response = $this->getJson('/api/presents');

        $response->assertStatus(200)
            ->assertJson([
                'presentsCount' => 25
            ]);

        $this->assertCount(20, $response->json()['presents'], 'Expected presents to set default limit to 20');

        $this->assertEquals(
            $this->user->presents()->latest()->take(20)->pluck('slug')->toArray(),
            array_column($response->json()['presents'], 'slug'),
            'Expected latest 20 presents by default'
        );

        $response = $this->getJson('/api/presents?limit=10&offset=5');

        $response->assertStatus(200)
            ->assertJson([
                'presentsCount' => 25
            ]);

        $this->assertCount(10, $response->json()['presents'], 'Expected present limit of 10 when set');

        $this->assertEquals(
            $this->user->presents()->latest()->skip(5)->take(10)->pluck('slug')->toArray(),
            array_column($response->json()['presents'], 'slug'),
            'Expected latest 10 presents with 5 offset'
        );
    }
}
