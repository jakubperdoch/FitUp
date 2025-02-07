<?php

namespace App\Models\WorkoutPlan;

use Illuminate\Database\Eloquent\Model;

class WorkoutPlanExercise extends Model
{

    protected $fillable = [
        'workout_plan_id',
        'parent_exercise_id',
        'type',
        'name',
        'order_index',
    ];
    protected $table = 'workout_plan_exercises';

    protected $hidden = ['created_at', 'updated_at'];

    public function workout()
    {
        return $this->belongsTo(WorkoutPlan::class);
    }

    public function sets()
    {
        return $this->hasMany(WorkoutPlanSet::class, 'workout_plan_exercise_id')->orderBy('order_index');
    }

    public function children()
    {
        return $this->hasMany(WorkoutPlanExercise::class, 'parent_exercise_id')->orderBy('order_index');
    }

}
