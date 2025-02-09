<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('food_id');
            $table->string('name');
            $table->integer('quantity');
            $table->string('image')->nullable();
            $table->string('serving_description');
            $table->string('serving_id');
            $table->string('eaten_at');
            $table->date('date');
            $table->integer('calories');
            $table->integer('protein');
            $table->integer('carbs');
            $table->integer('fat');
            $table->integer('fiber');
            $table->integer('sugar');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meals');
    }
};
