<?php

namespace App\Models\Workout;

use Illuminate\Database\Eloquent\Model;

class WorkoutSet extends Model
{

    protected $fillable = [
        'workout_exercise_id',
        'special_type',
        'reps',
        'weight',
        'order_index',
    ];
    protected $table = 'workout_sets';

    protected $hidden = ['created_at', 'updated_at'];


    public function exercise()
    {
        return $this->belongsTo(WorkoutExercise::class);
    }

}
