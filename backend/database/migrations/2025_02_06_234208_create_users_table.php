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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string(('full_name'));
            $table->string('email')->unique();
            $table->string('password');
            $table->string('birth_date')->nullable();
            $table->string('weight')->nullable();
            $table->string('height')->nullable();
            $table->string('gender')->nullable();
            $table->string('goal')->nullable();
            $table->string('onboarding')->default('false');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
