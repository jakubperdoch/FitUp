<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Models\UserPreferences;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class MealController extends Controller
{


    public function getMeals(Request $request)
    {

        $accessToken = $this->getFatsecretAccessToken();
        $query = $request->query();
        $lang = UserPreferences::where('user_id', $request->user()->id)->first()->selected_language;

        if ($lang == 'sk') {
            $query['search'] = $this->translateToEn($query['search']);
        }


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
            ->map(function ($food) use ($lang) {

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
                    'name' => $this->translate($food['food_name'], $lang) ?? null,
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

    public function getMealDetails(Request $request, $food_id, $id = null)
    {
        if (!is_numeric($food_id) || ($id !== null && !is_numeric($id))) {
            return response()->json([
                'message' => 'The Id muste be a number'
            ], 422);
        }


        $accessToken = $this->getFatsecretAccessToken();
        $lang = UserPreferences::where('user_id', $request->user()->id)->first()->selected_language;


        $mealResponse = Http::withToken($accessToken)
            ->get('https://platform.fatsecret.com/rest/server.api', [
                'method' => 'food.get.v4',
                'food_id' => $food_id,
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

        $storedMeal = null;

        if ($id) {
            $storedMeal = Meal::find($id);
            if (!$storedMeal) {
                return response()->json([
                    'message' => 'No meal with that id was found'
                ], 404);
            }

            if ($storedMeal->food_id !== $food_id) {
                return response()->json([
                    'message' => 'The meal id does not match the food id'
                ], 422);
            }
        }

        $allergens = collect($data['food_attributes']['allergens']['allergen'] ?? [])
            ->filter(function ($allergen) {
                return $allergen['value'] !== '0';
            })
            ->map(function ($allergen) {
                return $allergen['name'];
            })
            ->values();

        $servings = collect($data['servings']['serving'] ?? []);


        if ($lang == 'sk') {

            $allergens = $allergens->map(function ($allergen) {
                return $this->translate($allergen);
            });


            $servings = $servings->map(function ($serving) {
                $serving['serving_description'] = $this->translate($serving['serving_description']);
                return $serving;
            });
        }


        $meal = [
            'food_id' => $data['food_id'] ?? null,
            'name' => $this->translate($data['food_name'], $lang) ?? null,
            'url' => $data['food_url'] ?? null,
            'image' => $data['food_images']['food_image'][0]['image_url'] ?? null,
            'allergens' => $allergens ?? null,
            'servings' => $servings ?? null
        ];

        if ($storedMeal) {
            $meal['record_id'] = $storedMeal->id;
            $meal['selected_serving_quantity'] = $storedMeal->quantity;
            $meal['selected_serving_id'] = $storedMeal->serving_id;
            $meal['selected_eaten_at'] = $storedMeal->eaten_at;
        }

        return response()->json([
            'message' => 'Meal retrieved',
            'meal' => $meal,
        ]);
    }

    public function retrieveAllMeals(Request $request)
    {

        $query = $request->query();

        $max_results = isset($query['max']) ? (int)$query['max'] : null;


        $validator = Validator::make($request->all(), [
            'date' => ['required', 'date'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        $meals = Meal::where('user_id', $user->id)
            ->where('date', Carbon::parse($request->date)->format('Y-m-d'))
            ->get();

        $sortedMeals = collect($meals)
            ->groupBy('eaten_at')
            ->sortBy(function ($meals, $key) {
                return array_search($key, ['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner', 'lateNightSnack']);
            });

        $sortedMeals = $max_results ? $sortedMeals->take($max_results) : $sortedMeals;


        return response()->json([
            'message' => 'Meals retrieved',
            'meals' => $sortedMeals
        ]);

    }

    public function getTodayMeals(Request $request)
    {
        $query = $request->query();
        $max_results = isset($query['max']) ? (int)$query['max'] : null;


        $user = $request->user();
        $today = Carbon::now()->format('Y-m-d');

        $meals = Meal::where('user_id', $user->id)
            ->where('date', '=', $today)
            ->get();


        $order = ['lateNightSnack', 'dinner', 'afternoonSnack', 'lunch', 'morningSnack', 'breakfast'];

        $sortedMeals = collect($meals)
            ->sortBy(function ($meal) use ($order) {
                return array_search($meal->eaten_at, $order);
            });


        if ($max_results) {
            $sortedMeals = $sortedMeals->take($max_results);
        }


        $sortedMeals = $sortedMeals->values();


        return response()->json([
            'message' => 'Meals retrieved',
            'meals' => $sortedMeals
        ], 200);
    }


    public function addMeal(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'food_id' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'max:255'],
            'image' => ['required', 'string', 'max:255'],
            'serving_description' => ['required', 'string', 'max:255'],
            'serving_id' => ['required', 'string', 'max:255'],
            'eaten_at' => ['required', 'string', 'max:255', Rule::in(['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner', 'lateNightSnack'])],
            'date' => ['required', 'date'],
            'calories' => ['required', 'numeric'],
            'protein' => ['required', 'numeric'],
            'carbs' => ['required', 'numeric'],
            'fat' => ['required', 'numeric'],
            'fiber' => ['required', 'numeric'],
            'sugar' => ['required', 'numeric'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        $meal = Meal::create([
            'food_id' => $request->food_id,
            'user_id' => $user->id,
            'name' => $request->name,
            'quantity' => $request->quantity,
            'image' => $request->image,
            'serving_description' => $request->serving_description,
            'serving_id' => $request->serving_id,
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
            'message' => 'Meal added',
            'meal' => $meal
        ], 201);

    }

    public function updateMeal(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'max:255'],
            'serving_description' => ['required', 'string', 'max:255'],
            'serving_id' => ['required', 'string', 'max:255'],
            'eaten_at' => ['required', 'string', 'max:255', Rule::in(['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner', 'lateNightSnack'])],
            'calories' => ['required', 'numeric'],
            'protein' => ['required', 'numeric'],
            'carbs' => ['required', 'numeric'],
            'fat' => ['required', 'numeric'],
            'fiber' => ['required', 'numeric'],
            'sugar' => ['required', 'numeric'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $meal = Meal::find($request->id);

        if (!$meal) {
            return response()->json([
                'message' => 'Meal not found'
            ], 404);
        }

        $meal->update([
            'quantity' => $request->quantity,
            'serving_description' => $request->serving_description,
            'serving_id' => $request->serving_id,
            'eaten_at' => $request->eaten_at,
            'calories' => $request->calories,
            'protein' => $request->protein,
            'carbs' => $request->carbs,
            'fat' => $request->fat,
            'fiber' => $request->fiber,
            'sugar' => $request->sugar,
        ]);

        return response()->json([
            'message' => 'Meal updated',
            'meal' => $meal
        ]);
    }

    public function deleteMeal($id)
    {
        $meal = Meal::find($id);

        if (!$meal) {
            return response()->json([
                'message' => 'Meal not found'
            ], 404);
        }

        $meal->delete();

        return response()->json([
            'message' => 'Meal deleted'
        ], 200);
    }

    public function refreshToken()
    {
        Cache::forget('fatsecret_access_token');
        $token = app(MealController::class)->getFatsecretAccessToken();
        return response()->json(['access_token' => $token]);
    }

}
