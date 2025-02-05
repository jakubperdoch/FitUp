<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class MealController extends Controller
{

    //    fat secret api
    public function addMeal(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'api_id' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'max:255'],
            'serving' => ['required', 'integer', 'max:255'],
            'eaten_at' => ['required', 'string', 'max:255', Rule::in(['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner'])],
            'date' => ['required', 'date'],
            'calories' => ['required', 'integer'],
            'protein' => ['required', 'integer'],
            'carbs' => ['required', 'integer'],
            'fat' => ['required', 'integer'],
            'fiber' => ['required', 'integer'],
            'sugar' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = $request->user();

        $meal = Meal::create([
            'api_id' => $request->api_id,
            'user_id' => $user->id,
            'name' => $request->name,
            'quantity' => $request->quantity,
            'serving' => $request->serving,
            'eaten_at' => $request->eaten_at,
            'date' => Carbon::parse($request->date)->format('Y-m-d'),
            'calories' => $request->calories,
            'protein' => $request->protein,
            'carbs' => $request->carbs,
            'fat' => $request->fat,
            'fiber' => $request->fiber,
            'sugar' => $request->sugar,
        ]);

        return response()->json([
            'meal' => $meal
        ], 201);
    }

    public function getMeals(Request $request)
    {

        $accessToken = $this->getFatsecretAccessToken();
        $query = $request->query();

        $meals = Http::withToken($accessToken)
            ->get('https://platform.fatsecret.com/rest/server.api', [
                'method' => 'foods.search.v3',
                'search_expression' => $query['search'],
                'format' => 'json',
                'include_food_images' => 'true',
                'max_results' => 10,
                'include_food_attributes' => 'true',
                'page_number' => $query['page'] ?? 0,
            ]);

        if ($meals->failed()) {
            return response()->json([
                'message' => 'Unable to retrieve meals'
            ], 500);
        };

        $foods = collect($meals['foods_search']['results']['food'])
            ->map(function ($food) {

                $selectedServing = collect($food['servings']['serving'])
                    ->first(function ($serving) {
                        return (float)$serving['number_of_units'] === 100.0;
                    });

                if (!isset($selectedServing)) {
                    $selectedServing = collect($food['servings']['serving'])->first();
                }

                if (!isset($selectedServing['number_of_units'])) {
                    return null;
                }

                return [
                    'id' => $food['food_id'] ?? null,
                    'name' => $food['food_name'] ?? null,
                    'image' => $food['food_images']['food_image'][1]['image_url'] ?? null,
                    'serving' => [
                        'description' => $selectedServing['serving_description'] ?? null,
                        'calories' => $selectedServing['calories'] ?? null,
                    ],
                ];
            })->filter()
            ->values();;

        if ($foods->isEmpty()) {
            return response()->json([
                'message' => 'No meals found'
            ], 404);
        }


        $currentPage = (int)$meals['foods_search']['page_number'];
        $maxPage = floor((int)$meals['foods_search']['total_results'] / 10);


        return response()->json([
            'message' => 'Meals retrieved',
            'current_page' => $currentPage,
            'max_page' => $maxPage,
            'meals' => $foods,
        ]);
    }

    public function getFatsecretAccessToken()
    {
        return Cache::remember('fatsecret_access_token', 86400, function () {
            $response = Http::withBasicAuth(config('services.fatsecret.client_id'), config('services.fatsecret.client_secret'))
                ->asForm()
                ->post('https://oauth.fatsecret.com/connect/token', [
                    'grant_type' => 'client_credentials',
                    'scope' => 'premier',
                ]);

            if ($response->failed()) {
                abort(500, 'Unable to retrieve access token');
            };

            $data = $response->json();

            $expiresIn = $data['expires_in'] ?? 86400;
            Cache::put('fatsecret_access_token', $data['access_token'], $expiresIn);

            return $data['access_token'];
        });

    }

    public function getMealDetails($id)
    {
        if (!is_numeric($id)) {
            return response()->json([
                'message' => 'The Id muste be a number'
            ], 422);
        }

        $accessToken = $this->getFatsecretAccessToken();

        $mealResponse = Http::withToken($accessToken)
            ->get('https://platform.fatsecret.com/rest/server.api', [
                'method' => 'food.get.v4',
                'food_id' => $id,
                'format' => 'json',
                'include_food_images' => 'true',
                'include_food_attributes' => 'true'
            ]);


        if ($mealResponse->failed()) {
            return response()->json([
                'message' => 'No meal with that id was found'
            ], 404);
        }

        $data = $mealResponse->json()['food'];

        $allergens = collect($data['food_attributes']['allergens']['allergen'] ?? [])
            ->filter(function ($allergen) {
                return $allergen['value'] !== '0';
            })
            ->values();


        $meal = [
            'id' => $data['food_id'] ?? null,
            'name' => $data['food_name'] ?? null,
            'url' => $data['food_url'] ?? null,
            'image' => $data['food_images']['food_image'][0]['image_url'] ?? null,
            'allergens' => $allergens ?? null,
            'servings' => $data['servings']['serving'] ?? null
        ];

        return response()->json([
            'message' => 'Meal retrieved',
            'meal' => $meal
        ]);

    }

    public function refreshToken()
    {
        Cache::forget('fatsecret_access_token');
        $token = app(MealController::class)->getFatsecretAccessToken();
        return response()->json(['access_token' => $token]);
    }

}
