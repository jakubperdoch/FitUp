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

        return response()->json([
            'message' => 'Macro Stats retrieved',
            'macros' => [
                'total_calories' => $total_calories,
                'total_protein' => $total_protein,
                'total_carbs' => $total_carbs,
                'total_fat' => $total_fat,
                'total_fiber' => $total_fiber,
                'total_sugar' => $total_sugar,
            ]
        ], 200);

    }


}
