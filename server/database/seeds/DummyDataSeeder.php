<?php

use Illuminate\Database\Seeder;

class DummyDataSeeder extends Seeder
{
    /**
     * Total number of users.
     *
     * @var int
     */
    protected $totalUsers = 20;

    /**
     * Total number of tags.
     *
     * @var int
     */
    protected $totalTags = 10;

    /**
     * Percentage of users with presents.
     *
     * @var float Value should be between 0 - 1.0
     */
    protected $userWithPresentRatio = 0.8;

    /**
     * Maximum presents that can be created by a user.
     *
     * @var int
     */
    protected $maxPresentsByUser = 5;

    /**
     * Maximum tags that can be attached to an present.
     *
     * @var int
     */
    protected $maxPresentTags = 3;

    /**
     * Maximum number of comments that can be added to an present.
     *
     * @var int
     */
    protected $maxCommentsInPresent = 3;

    /**
     * Percentage of users with favorites.
     *
     * @var float Value should be between 0 - 1.0
     */
    protected $usersWithFavoritesRatio = 0.75;

    /**
     * Percentage of users with following.
     *
     * @var float Value should be between 0 - 1.0
     */
    protected $usersWithFollowingRatio = 0.75;

    /**
     * Populate the database with dummy data for testing.
     * Complete dummy data generation including relationships.
     * Set the property values as required before running database seeder.
     *
     * @param \Faker\Generator $faker
     */
    public function run(\Faker\Generator $faker)
    {
        $users = factory(\App\User::class)->times($this->totalUsers)->create();

        $tags = factory(\App\Tag::class)->times($this->totalTags)->create();

        $users->random((int) $this->totalUsers * $this->userWithPresentRatio)
            ->each(function ($user) use ($faker, $tags) {
                $user->presents()
                    ->saveMany(
                        factory(\App\Present::class)
                        ->times($faker->numberBetween(1, $this->maxPresentsByUser))
                        ->make()
                    )
                    ->each(function ($present) use ($faker, $tags) {
                        $present->tags()->attach(
                            $tags->random($faker->numberBetween(1, min($this->maxPresentTags, $this->totalTags)))
                        );
                    })
                    ->each(function ($present) use ($faker) {
                        $present->images()
                            ->saveMany(
                                factory(\App\Image::class)
                                    ->times($faker->numberBetween(1, 3))
                                    ->make()
                            );
                    })
                    ->each(function ($present) use ($faker) {
                        $present->comments()
                            ->saveMany(
                                factory(\App\Comment::class)
                                ->times($faker->numberBetween(1, $this->maxCommentsInPresent))
                                ->make()
                            );
                    });
            });

        $presents = \App\Present::all();

        $users->random((int) $users->count() * $this->usersWithFavoritesRatio)
            ->each(function ($user) use($faker, $presents) {
                $presents->random($faker->numberBetween(1, (int) $presents->count() * 0.5))
                    ->each(function ($present) use ($user) {
                        $user->favorite($present);
                    });
            });

        $users->random((int) $users->count() * $this->usersWithFollowingRatio)
            ->each(function ($user) use($faker, $users) {
                $users->except($user->id)
                    ->random($faker->numberBetween(1, (int) ($users->count() - 1) * 0.2))
                    ->each(function ($userToFollow) use ($user) {
                        $user->follow($userToFollow);
                    });
            });
    }
}
