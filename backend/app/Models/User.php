<?php

namespace App\Models;

use App\Models\WorkoutPlan\WorkoutPlan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'full_name',
        'birth_date',
        'weight',
        'height',
        'gender',
        'goal',
        'email',
        'password',
        'onboarding',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function meals()
    {
        return $this->hasMany(Meal::class);
    }

    public function workoutPlans()
    {
        return $this->hasMany(WorkoutPlan::class);
    }

    public function userPreferences()
    {
        return $this->hasOne(UserPreferences::class);
    }

}
