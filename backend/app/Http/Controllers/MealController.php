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

    public function getMealDetails($food_id, $id = null)
    {
        if (!is_numeric($food_id) || ($id !== null && !is_numeric($id))) {
            return response()->json([
                'message' => 'The Id muste be a number'
            ], 422);
        }


        $accessToken = $this->getFatsecretAccessToken();

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
            ->values();


        $meal = [
            'food_id' => $data['food_id'] ?? null,
            'name' => $data['food_name'] ?? null,
            'url' => $data['food_url'] ?? null,
            'image' => $data['food_images']['food_image'][0]['image_url'] ?? null,
            'allergens' => $allergens ?? null,
            'servings' => $data['servings']['serving'] ?? null
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

        return response()->json([
            'message' => 'Meals retrieved',
            'meals' => $sortedMeals
        ]);

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
