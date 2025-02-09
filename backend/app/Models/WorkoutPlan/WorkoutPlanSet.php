<?php

namespace App\Models\WorkoutPlan;

use Illuminate\Database\Eloquent\Model;

class WorkoutPlanSet extends Model
{

    protected $fillable = [
        'workout_plan_exercise_id',
        'special_type',
        'order_index',
    ];
    protected $table = 'workout_plan_sets';

    protected $hidden = ['created_at', 'updated_at'];


    public function exercise()
    {
        return $this->belongsTo(WorkoutPlanExercise::class);
    }

}
