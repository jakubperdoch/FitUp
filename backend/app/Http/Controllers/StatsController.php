<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class StatsController extends Controller
{

    public function getTodaysMacros(Request $request)
    {

        $user = $request->user();

        $today = Carbon::now()->format('Y-m-d');
        $meals = $user->meals()->where('date', $today)->get();

        $total_calories = 0;
        $total_protein = 0;
        $total_carbs = 0;
        $total_fat = 0;
        $total_fiber = 0;
        $total_sugar = 0;

        foreach ($meals as $meal) {
            $total_calories += $meal->calories;
            $total_protein += $meal->protein;
            $total_carbs += $meal->carbs;
            $total_fat += $meal->fat;
            $total_fiber += $meal->fiber;
            $total_sugar += $meal->sugar;
        }

        $userPreferences = $user->userPreferences;

        $caloriesProgress = $userPreferences->calories > 0
            ? 1 - min($total_calories / $userPreferences->calories, 1)
            : 0;

        $proteinProgress = $userPreferences->protein > 0
            ? 1 - min($total_protein / $userPreferences->protein, 1)
            : 0;

        $carbsProgress = $userPreferences->carbs > 0
            ? 1 - min($total_carbs / $userPreferences->carbs, 1)
            : 0;

        $fatProgress = $userPreferences->fat > 0
            ? min($total_fat / $userPreferences->fat, 1)
            : 0;

        $fiberProgress = $userPreferences->fiber > 0
            ? 1 - min($total_fiber / $userPreferences->fiber, 1)
            : 0;

        $sugarProgress = $userPreferences->sugar > 0
            ? 1 - min($total_sugar / $userPreferences->sugar, 1)
            : 0;


        return response()->json([
            'message' => 'Macro Stats retrieved',
            'macros' => [
                'total_calories' => $caloriesProgress,
                'total_protein' => $proteinProgress,
                'total_carbs' => $carbsProgress,
                'total_fat' => $fatProgress,
                'total_fiber' => $fiberProgress,
                'total_sugar' => $sugarProgress,
            ],
            
        ], 200);

    }


}
