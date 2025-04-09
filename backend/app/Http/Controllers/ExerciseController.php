<?php

namespace App\Http\Controllers;


use App\Models\Exercise\Exercise;
use App\Models\Exercise\BodyPart;
use App\Models\Exercise\Muscle;
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
        $query = $request->query();
        $userId = $request->user()->id;

        $lang = UserPreferences::where('user_id', $userId)->value('selected_language') ?? 'en';
        $max_results = isset($query['max']) ? (int) $query['max'] : 10;
        $search = $query['search'] ?? '';


        if ($lang == 'sk' && !empty($search)) {
            $search = $this->translateToEn($search);
        }

        $results = !empty($search)
            ? Exercise::search($search)->take($max_results)->get()
            : Exercise::query()->limit($max_results)->get();

        if ($results->isEmpty()) {
            return response()->json([
                'message' => 'No exercises found for this muscle group',
            ], 404);
        }


        $exercises = $results->map(function ($exercise) use ($lang) {
            return [
                'id' => $exercise->id,
                'type' => 'exercise',
                'exercise_id' => $exercise->exercise_id,
                'name' => $this->translate($exercise->name, $lang),
                'target_muscles' => [$exercise->target_muscles],
            ];
        });;


        return response()->json([
            'message' => 'Exercises retrieved',
            'total_results' => $exercises->count(),
            'exercises' => $exercises,
        ], 200);

    }

    public function translateToEn($text)
    {
        return \Cache::remember("translation_sk_to_en_" . md5($text), 3600, function () use ($text) {
            $authKey = '587e6406-ff60-45e4-826c-442c3822a4ad';
            $deeplClient = new \DeepL\DeepLClient($authKey);
            $response = $deeplClient->translateText($text, 'SK', 'EN-US');
            return $response->text;
        });
    }

    public function translate($text, $lang = 'sk')
    {
        if ($lang !== 'sk' || empty($text)) {
            return $text;
        }

        return \Cache::remember("translation_en_to_sk_" . md5($text), 3600, function () use ($text) {
            $authKey = '587e6406-ff60-45e4-826c-442c3822a4ad';
            $deeplClient = new \DeepL\DeepLClient($authKey);
            $response = $deeplClient->translateText($text, 'EN', 'SK');
            return $response->text;
        });return $text;
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
