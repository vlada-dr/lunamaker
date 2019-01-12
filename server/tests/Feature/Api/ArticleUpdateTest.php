<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class PresentUpdateTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_returns_the_updated_present_on_successfully_updating_the_present()
    {
        $present = $this->loggedInUser->presents()->save(factory(\App\Present::class)->make());

        $data = [
            'present' => [
                'title' => 'new title',
                'description' => 'new description',
                'body' => 'new body with random text',
            ]
        ];

        $response = $this->putJson("/api/presents/{$present->slug}", $data, $this->headers);

        $response->assertStatus(200)
            ->assertJson([
                'present' => [
                    'slug' => 'new-title',
                    'title' => 'new title',
                    'description' => 'new description',
                    'body' => 'new body with random text',
                ]
            ]);
    }

    /** @test */
    public function it_returns_appropriate_field_validation_errors_when_updating_the_present_with_invalid_inputs()
    {
        $present = $this->loggedInUser->presents()->save(factory(\App\Present::class)->make());

        $data = [
            'present' => [
                'title' => '',
                'description' => '',
                'body' => null,
            ]
        ];

        $response = $this->putJson("/api/presents/{$present->slug}", $data, $this->headers);

        $response->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'title' => ['must be a string.'],
                    'description' => ['must be a string.'],
                    'body' => ['must be a string.'],
                ]
            ]);
    }

    /** @test */
    public function it_returns_an_unauthorized_error_when_trying_to_update_present_without_logging_in()
    {
        $present = $this->loggedInUser->presents()->save(factory(\App\Present::class)->make());

        $data = [
            'present' => [
                'title' => 'new title',
                'description' => 'new description',
                'body' => 'new body with random text',
            ]
        ];

        $response = $this->putJson("/api/presents/{$present->slug}", $data);

        $response->assertStatus(401);
    }

    /** @test */
    public function it_returns_a_forbidden_error_when_trying_to_update_presents_by_others()
    {
        $present = $this->user->presents()->save(factory(\App\Present::class)->make());

        $data = [
            'present' => [
                'title' => 'new title',
                'description' => 'new description',
                'body' => 'new body with random text',
            ]
        ];

        $response = $this->putJson("/api/presents/{$present->slug}", $data, $this->headers);

        $response->assertStatus(403);
    }
}
