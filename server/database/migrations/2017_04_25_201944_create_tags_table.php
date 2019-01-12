<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('type')->default(0);
            $table->timestamps();

            $table->unique('name');
        });

        Schema::create('present_tag', function (Blueprint $table) {
            $table->unsignedInteger('present_id');
            $table->unsignedInteger('tag_id');

            $table->primary(['present_id', 'tag_id']);

            $table->foreign('present_id')
                ->references('id')
                ->on('presents')
                ->onDelete('cascade');

            $table->foreign('tag_id')
                ->references('id')
                ->on('tags')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('present_tag');
        Schema::dropIfExists('tags');
    }
}
