<?php

namespace App\Http\Controllers;


use App\Models\Exercise\Exercise;
use App\Models\Exercise\BodyPart;
use App\Models\UserPreferences;
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
        $lang = UserPreferences::where('user_id', $request->user()->id)->first()->selected_language;

        $max_results = isset($query['max']) ? (int)$query['max'] : 10;
        $search = $query['search'];

        if ($lang == 'sk') {
            $search = $this->translateToEn($query['search']);
        }

        $data = Exercise::where('name', 'like', '%' . $search . '%')->get();

        if ($data->isEmpty()) {
            return response()->json([
                'message' => 'No exercises found for this muscle group',
            ], 404);
        }

        $exercises = $data->map(function ($exercise) use ($lang) {
            $target_muscles = [$exercise->target_muscles];

            return [
                'id' => $exercise->id,
                'type' => 'exercise',
                'exercise_id' => $exercise->exercise_id,
                'name' => $this->translate($exercise->name, $lang),
                'target_muscles' => $target_muscles,
            ];
        });


        return response()->json([
            'message' => 'Exercises retrieved',
            'total_results' => $exercises->count(),
            'exercises' => $exercises->take($max_results)
        ], 200);

    }

    public function translateToEn($text)
    {
        $authKey = '8605c424-1199-4c66-be40-0949548513b1:fx';

        $deeplClient = new \DeepL\DeepLClient($authKey);

        $response = $deeplClient->translateText($text, 'SK', 'En-US');

        return $response->text;
    }

    public function translate($text, $lang = 'sk')
    {
        if ($lang == 'sk') {
            $authKey = '8605c424-1199-4c66-be40-0949548513b1:fx';

            $deeplClient = new \DeepL\DeepLClient($authKey);

            $response = $deeplClient->translateText($text, 'EN', 'SK');

            return $response->text;
        } else {
            return $text;
        }
    }

    public function getExerciseDetails(Request $request)
    {
        $data = Exercise::find($request->id);
        $lang = UserPreferences::where('user_id', $request->user()->id)->first()->selected_language;

        if (!$data) {
            return response()->json([
                'message' => 'Exercise not found',
            ], 404);
        }

        $exerciseArray = $data->toArray();

        $instructions = [];
        foreach ($exerciseArray as $key => $value) {
            if (strpos($key, 'instructions_') === 0 && !empty($value)) {
                $instructions[$key] = $this->translate($value, $lang);
            }
        }

        ksort($instructions, SORT_NATURAL);
        $instructions = array_values($instructions);

        $exercise = [
            'id' => $data->id,
            'type' => 'exercise',
            'exercise_id' => $data->exercise_id,
            'name' => $this->translate($data->name, $lang),
            'target_muscles' => $this->translate($data->target_muscles, $lang),
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
