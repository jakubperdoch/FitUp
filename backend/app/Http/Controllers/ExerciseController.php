<?php

namespace App\Http\Controllers;


use App\Models\Exercise\Exercise;
use App\Models\Exercise\Muscle;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{

    public function getMuscles()
    {
        $muscles = Muscle::all();

        return response()->json([
            'message' => 'Muscles retrieved',
            'muscles' => $muscles
        ], 200);
    }

    public function getExercises(Request $request)
    {
        $muscle = $request->query();

        $data = Exercise::where('target_muscles', $muscle)
            ->get();

        if ($data->isEmpty()) {
            return response()->json([
                'message' => 'No exercises found for this muscle group',
            ], 404);
        }

        $exercises = collect($data)
            ->map(function ($exercise) {
                return [
                    'id' => $exercise->id,
                    'exercise_id' => $exercise->exercise_id,
                    'name' => $exercise->name,
                    'target_muscles' => $exercise->target_muscles,
                ];
            });


        return response()->json([
            'message' => 'Exercises retrieved',
            'exercises' => $exercises
        ], 200);

    }


    public function getExerciseDetails(Request $request)
    {
        $exercise = Exercise::find($request->id);

        if (!$exercise) {
            return response()->json([
                'message' => 'Exercise not found',
            ], 404);
        }

        return response()->json([
            'message' => 'Exercise retrieved',
            'exercise' => $exercise
        ], 200);
    }


}
