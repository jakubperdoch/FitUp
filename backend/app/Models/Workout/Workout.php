<?php

namespace App\Models\Workout;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{

    protected $fillable = [
        'user_id',
        'name',
        'timer',
        'days',
    ];

    protected $table = 'workouts';

    protected $casts = [
        'days' => 'array',
    ];

    protected $hidden = ['created_at', 'updated_at'];


    public function exercises()
    {
        return $this->hasMany(WorkoutExercise::class)->whereNull('parent_exercise_id')->orderBy('order_index');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
