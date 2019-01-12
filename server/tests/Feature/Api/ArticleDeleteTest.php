<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class PresentDeleteTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_returns_a_200_success_response_on_successfully_removing_the_present()
    {
        $present = $this->loggedInUser->presents()->save(factory(\App\Present::class)->make());

        $response = $this->deleteJson("/api/presents/{$present->slug}", [], $this->headers);

        $response->assertStatus(200);

        $response = $this->getJson("/api/presents/{$present->slug}");

        $response->assertStatus(404);
    }

    /** @test */
    public function it_returns_an_unauthorized_error_when_trying_to_remove_present_without_logging_in()
    {
        $present = $this->loggedInUser->presents()->save(factory(\App\Present::class)->make());

        $response = $this->deleteJson("/api/presents/{$present->slug}");

        $response->assertStatus(401);
    }

    /** @test */
    public function it_returns_a_forbidden_error_when_trying_to_remove_presents_by_others()
    {
        $present = $this->user->presents()->save(factory(\App\Present::class)->make());

        $response = $this->deleteJson("/api/presents/{$present->slug}", [], $this->headers);

        $response->assertStatus(403);
    }
}
