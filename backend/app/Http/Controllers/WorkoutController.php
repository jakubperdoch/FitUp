<?php

namespace App\Http\Controllers;


use App\Models\Workout\Workout;
use App\Models\Workout\WorkoutExercise;
use App\Models\Workout\WorkoutSet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkoutController extends Controller
{

    public function addWorkout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'days' => ['required', 'array'],
            'timer' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = $request->user();
        $data = $request->all();

        $workout = Workout::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'days' => $request->days,
            'timer' => $request->timer
        ]);

        if (isset($data['exercises']) && is_array($data['exercises'])) {
            foreach ($data['exercises'] as $index => $exerciseData) {
                $this->addExercises($exerciseData, $workout->id, $index, null);
            }
        }
    }


    public function addExercises(array $data, int $workoutId, int $orderIndex, ?int $parentId = null)
    {


        $exercise = WorkoutExercise::create([
            'workout_id' => $workoutId,
            'parent_exercise_id' => $parentId,
            'type' => $data['type'] ?? null,
            'name' => $data['name'] ?? null,
            'order_index' => $orderIndex,
        ]);

        if (isset($data['sets']) && is_array($data['sets'])) {
            foreach ($data['sets'] as $setIndex => $setData) {
                WorkoutSet::create([
                    'workout_exercise_id' => $exercise->id,
                    'special_type' => $setData['special_type'] ?? null,
                    'reps' => $setData['reps'] ?? null,
                    'weight' => $setData['weight'] ?? null,
                    'order_index' => $setIndex,
                ]);
            }
        }

        if (isset($data['exercises']) && is_array($data['exercises'])) {
            foreach ($data['exercises'] as $childIndex => $childExerciseData) {
                $this->addExercises($childExerciseData, $workoutId, $childIndex, $exercise->id);
            }
        }


        return $exercise;
    }

    public function getWorkouts(Request $request)
    {
        $user = $request->user();
        $workouts = Workout::where('user_id', $user->id)->get();
        return response()->json([
            'message' => 'Workouts retrieved successfully',
            'workouts' => $workouts
        ]);
    }

}
