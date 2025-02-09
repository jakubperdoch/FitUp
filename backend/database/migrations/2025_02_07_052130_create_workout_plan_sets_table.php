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
        Schema::create('workout_plan_sets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('workout_plan_exercise_id');
            $table->string('special_type')->nullable();
            $table->integer('order_index')->default(0);
            $table->timestamps();

            $table->foreign('workout_plan_exercise_id')->references('id')->on('workout_plan_exercises')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workout_plan_sets');
    }
};
