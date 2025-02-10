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
            ? 1 - min($total_fat / $userPreferences->fat, 1)
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

    public function getMonthlyWorkoutStats(Request $request)
    {
        $user = $request->user();
        $startDate = Carbon::now()->subMonths(5)->startOfMonth();

        $workouts = $user->workouts()
            ->where('created_at', '>=', $startDate)
            ->get();


        $groupedWorkouts = $workouts->groupBy(function ($workout) {
            return Carbon::parse($workout->created_at)->format('n');
        });

        $groupedTotals = $groupedWorkouts->map(function ($workouts) {
            $total = 0;
            foreach ($workouts as $workout) {
                foreach ($workout->exercises as $exercise) {
                    foreach ($exercise->sets as $set) {
                        $total += $set->weight;
                    }
                }
            }
            return $total;
        });


        $total_weight_lifted = [];
        $monthIterator = $startDate->copy();
        $startMonth = (int)$startDate->format('n');

        for ($i = 0; $i < 6; $i++) {
            $currentMonth = (int)$monthIterator->format('n');
            $label = $currentMonth < $startMonth ? $currentMonth + 12 : $currentMonth;

            $value = $groupedTotals->get($currentMonth, 0);

            $total_weight_lifted[] = [
                'label' => $label,
                'value' => $value,
            ];

            $monthIterator->addMonth();
        }

        $total_workouts = $workouts->count();
        $total_time = 0;
        $avg_weight = 0;
        $avg_reps = 0;


        foreach ($workouts as $workout) {
            $total_time += $workout->timer;
            foreach ($workout->exercises as $exercise) {
                foreach ($exercise->sets as $set) {
                    $avg_weight += $set->weight;
                    $avg_reps += $set->reps;
                }
            }
        }

        $avg_weight = $total_workouts > 0 ? $avg_weight / $total_workouts : 0;
        $avg_reps = $total_workouts > 0 ? $avg_reps / $total_workouts : 0;

        $most_freq_exercise = $workouts->map(function ($workout) {
            return $workout->exercises->map(function ($exercise) {
                return $exercise->name;
            });
        })->flatten()->countBy()->sortDesc()->keys()->first();

        return response()->json([
            'message' => 'Workout Stats retrieved',
            'workout_stats' => [
                'totalWorkouts' => $total_workouts,
                'totalWorkoutTime' => $total_time,
                'avgWeight' => $avg_weight,
                'avgReps' => $avg_reps,
                'mostFrequentExercise' => $most_freq_exercise,
                'totalWeightLifted' => $total_weight_lifted,
            ],

        ], 200);
    }


    public function getMonthlyMacroStats(Request $request)
    {
        $user = $request->user();
        $startDate = Carbon::now()->subMonths(6)->startOfMonth();

        $meals = $user->meals()
            ->where('date', '>=', $startDate)
            ->get();

        $total_calories = 0;
        $total_protein = 0;
        $total_carbs = 0;
        $total_fat = 0;
        $total_fiber = 0;
        $total_sugar = 0;

        $meals->each(function ($meal) use (&$total_calories, &$total_protein, &$total_carbs, &$total_fat, &$total_fiber, &$total_sugar) {
            $total_calories += $meal->calories;
            $total_protein += $meal->protein;
            $total_carbs += $meal->carbs;
            $total_fat += $meal->fat;
            $total_fiber += $meal->fiber;
            $total_sugar += $meal->sugar;
        });

        $most_freq_meal = $meals->map(function ($meal) {
            return $meal->name;
        })->countBy()->sortDesc()->keys()->first();

        return response()->json([
            'message' => 'Macro Stats retrieved',
            'macro_stats' => [
                'totalCalories' => $total_calories,
                'mostFrequentMeal' => $most_freq_meal,
                'macros' => [
                    'protein' => $total_protein,
                    'carbs' => $total_carbs,
                    'fat' => $total_fat,
                    'fiber' => $total_fiber,
                    'sugar' => $total_sugar,
                ]
            ],

        ], 200);


    }

}
