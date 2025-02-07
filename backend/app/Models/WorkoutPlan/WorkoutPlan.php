<?php

namespace App\Models\WorkoutPlan;

use Illuminate\Database\Eloquent\Model;

class WorkoutPlan extends Model
{

    protected $fillable = [
        'user_id',
        'name',
        'days',
    ];

    protected $table = 'workout_plans';

    protected $casts = [
        'days' => 'array',
    ];

    protected $hidden = ['created_at', 'updated_at'];


    public function exercises()
    {
        return $this->hasMany(WorkoutPlanExercise::class)->whereNull('parent_exercise_id')->orderBy('order_index');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
