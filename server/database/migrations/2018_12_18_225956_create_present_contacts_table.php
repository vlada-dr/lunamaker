<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePresentContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('present_contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('value');
            $table->string('type');
            $table->unsignedInteger('present_id');
            $table->timestamps();

            $table->unique('value');

            $table->foreign('present_id')
                ->references('id')
                ->on('presents')
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
        Schema::dropIfExists('present_contacts');
    }
}
