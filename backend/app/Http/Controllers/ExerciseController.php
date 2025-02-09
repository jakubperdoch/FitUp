<?php

namespace App\Http\Controllers;


use App\Models\Exercise\Exercise;
use App\Models\Exercise\BodyPart;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{

    public function getBodyParts()
    {
        $body_parts = BodyPart::all();

        return response()->json([
            'message' => 'Body Parts retrieved',
            'body_parts' => $body_parts
        ], 200);
    }

    public function getExercises(Request $request)
    {
        $query = $request->query();

        $max_results = isset($query['max']) ? (int)$query['max'] : 10;
        $search = $query['search'] ?? null;


        $data = Exercise::where('name', 'like', '%' . $search . '%')->get();

        if ($data->isEmpty()) {
            return response()->json([
                'message' => 'No exercises found for this muscle group',
            ], 404);
        }

        $exercises = $data->map(function ($exercise) {
            $target_muscles = [$exercise->target_muscles];

            return [
                'id' => $exercise->id,
                'type' => 'exercise',
                'exercise_id' => $exercise->exercise_id,
                'name' => $exercise->name,
                'target_muscles' => $target_muscles,
            ];
        });


        return response()->json([
            'message' => 'Exercises retrieved',
            'total_results' => $exercises->count(),
            'exercises' => $exercises->take($max_results)
        ], 200);

    }


    public function getExerciseDetails(Request $request)
    {
        $data = Exercise::find($request->id);

        if (!$data) {
            return response()->json([
                'message' => 'Exercise not found',
            ], 404);
        }

        $exerciseArray = $data->toArray();

        $instructions = [];
        foreach ($exerciseArray as $key => $value) {
            if (strpos($key, 'instructions_') === 0 && !empty($value)) {
                $instructions[$key] = $value;
            }
        }

        ksort($instructions, SORT_NATURAL);
        $instructions = array_values($instructions);

        $exercise = [
            'id' => $data->id,
            'type' => 'exercise',
            'exercise_id' => $data->exercise_id,
            'name' => $data->name,
            'target_muscles' => $data->target_muscles,
            'equipments' => $data->equipments,
            'gif' => $data->gif,
            'instructions' => $instructions,
        ];

        return response()->json([
            'message' => 'Exercise retrieved',
            'exercise' => $exercise,
        ], 200);
    }


}
