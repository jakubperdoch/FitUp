<?php

namespace App\Http\Controllers;

use App\Models\WorkoutPlan\WorkoutPlanExercise;
use App\Models\WorkoutPlan\WorkoutPlan;
use App\Models\WorkoutPlan\WorkoutPlanSet;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkoutPlanController extends Controller
{

    public function createWorkoutPlan(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'days' => ['required', 'array'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = $request->user();
        $data = $request->all();


        $workout = WorkoutPlan::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'days' => $request->days
        ]);

        if (isset($data['exercises']) && is_array($data['exercises'])) {
            foreach ($data['exercises'] as $index => $exerciseData) {
                $this->addExercises($exerciseData, $workout->id, $index, null);
            }
        }

        return response()->json([
            'message' => 'Workout created successfully',
            'workout' => $workout
        ], 201);

    }


    public function addExercises(array $data, int $workoutId, int $orderIndex, ?int $parentId = null)
    {


        $exercise = WorkoutPlanExercise::create([
            'workout_plan_id' => $workoutId,
            'parent_exercise_id' => $parentId,
            'type' => $data['type'] ?? null,
            'name' => $data['name'] ?? null,
            'order_index' => $orderIndex,
        ]);

        if (isset($data['sets']) && is_array($data['sets'])) {
            foreach ($data['sets'] as $setIndex => $setData) {
                WorkoutPlanSet::create([
                    'workout_plan_exercise_id' => $exercise->id,
                    'special_type' => $setData['specialType'] ?? null,
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

    public function getWorkoutPlan(Request $request, $id)
    {
        $data = WorkoutPlan::with('exercises.sets', 'exercises.exercises.sets')->find($id);


        if (!$data) {
            return response()->json([
                'message' => 'Workout Plan not found'
            ], 404);
        }

        $data->number_of_exercises = $this->countExercises($data->exercises);

        $today = Carbon::now();
        $closestDay = null;
        $minDiff = PHP_INT_MAX;

        foreach ($data->days as $day) {
            if ($today->format('l') === $day) {
                $closestDay = $today;
                $minDiff = 0;
                break;
            }
            $nextOccurrence = Carbon::parse("next $day");
            $diff = $today->diffInDays($nextOccurrence);
            if ($diff < $minDiff) {
                $minDiff = $diff;
                $closestDay = $nextOccurrence;
            }
        }

        $workoutPlan = [
            'id' => $data->id,
            'name' => $data->name ?? null,
            'day' => $closestDay?->format('l'),
            'days' => $data->days,
            'number_of_exercises' => $data->number_of_exercises ?? 0,
            'exercises' => $data->exercises ?? []
        ];

        return response()->json([
            'workout' => $workoutPlan
        ]);
    }

    private function countExercises($exercises)
    {
        $count = 0;
        foreach ($exercises as $exercise) {
            $count++;

            if ($exercise->children && $exercise->children->isNotEmpty()) {
                $count += $this->countExercises($exercise->children);
            }
        }
        return $count;
    }

    public function updateWorkoutPlan(Request $request, $id)
    {
        $workoutPlan = WorkoutPlan::find($id);

        if (!$workoutPlan) {
            return response()->json([
                'message' => 'Workout Plan not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'days' => ['required', 'array'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $workoutPlan->update([
            'name' => $request->name,
            'days' => $request->days
        ]);

        $workoutPlan->exercises()->delete();

        if (isset($data['exercises']) && is_array($data['exercises'])) {
            foreach ($data['exercises'] as $index => $exerciseData) {
                $this->addExercises($exerciseData, $workoutPlan->id, $index, null);
            }
        }

        return response()->json([
            'message' => 'Workout updated successfully',
            'workout' => $workoutPlan
        ]);
    }

    public function deleteWorkoutPlan(Request $request, $id)
    {
        $workoutPlan = WorkoutPlan::find($id);

        if (!$workoutPlan) {
            return response()->json([
                'message' => 'Workout Plan not found'
            ], 404);
        }

        $workoutPlan->delete();

        return response()->json([
            'message' => 'Workout deleted successfully'
        ]);
    }

    public function getWorkoutPlans(Request $request)
    {
        $user = $request->user();
        $query = $request->query();

        $max_results = isset($query['max']) ? (int)$query['max'] : null;

        $data = WorkoutPlan::with('exercises.sets', 'exercises.exercises.sets')
            ->where('user_id', $user->id)
            ->get();

        $data->each(function ($workout) {
            $workout->number_of_exercises = $this->countExercises($workout->exercises);
        });

        $workoutPlans = collect($data)->map(function ($workout) {

            $today = Carbon::now();
            $closestDay = null;
            $minDiff = PHP_INT_MAX;


            foreach ($workout->days as $dayName) {
                if ($today->format('l') === $dayName) {
                    $closestDay = $today;
                    $minDiff = 0;
                    break;
                }


                $nextOccurrence = Carbon::parse("next $dayName");
                $diff = $today->diffInDays($nextOccurrence);

                if ($diff < $minDiff) {
                    $minDiff = $diff;
                    $closestDay = $nextOccurrence;
                }
            }

            return [
                'id' => $workout->id,
                'name' => $workout->name ?? null,
                'day' => $closestDay?->format('l') ?? null,
                'number_of_exercises' => $workout->number_of_exercises ?? 0,
            ];
        })->sortBy('day')
            ->values();


        if ($max_results) {
            $workoutPlans = $workoutPlans->take($max_results);
        }

        return response()->json([
            'workouts' => $workoutPlans
        ]);
    }
}
