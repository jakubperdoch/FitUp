<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\WorkoutPlanController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\WorkoutController;

Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return 'Database connection successful!';
    } catch (\Exception $e) {
        return 'Could not connect to the database. Please check your configuration.';
    }
});

//auth endpoints
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::put('/change-password', [AuthController::class, 'changePassword'])->name('changePassword');
        Route::post('/finish-account', [AuthController::class, 'addAdditionalData'])->name('addAdditionalData');
        Route::post('/add-goal', [AuthController::class, 'addGoal'])->name('addGoal');
    });
});

//meals endpoints

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/meals/add', [MealController::class, 'addMeal'])->name('addMeal');
    Route::put('/meals/{id}/update', [MealController::class, 'updateMeal'])->name('updateMeal');
    Route::delete('/meals/{id}/delete', [MealController::class, 'deleteMeal'])->name('deleteMeal');
    Route::get('/meals', [MealController::class, 'getMeals'])->name('getMeals');
    Route::post('/meals/all', [MealController::class, 'retrieveAllMeals'])->name('retrieveAllMeals');
    Route::get('/meals/{food_id}/details/{id?}', [MealController::class, 'getMealDetails'])->name('getMealDetails');
    Route::get('/meals/today', [MealController::class, 'getTodayMeals'])->name('getTodayMeals');
    Route::get('/refresh-token', [MealController::class, 'refreshToken'])->name('refreshToken');
});

//workout plan endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/workouts/plans/add', [WorkoutPlanController::class, 'createWorkoutPlan'])->name('createWorkoutPlan');
    Route::put('/workouts/plans/{id}/update', [WorkoutPlanController::class, 'updateWorkoutPlan'])->name('updateWorkoutPlan');
    Route::delete('/workouts/plans/{id}/delete', [WorkoutPlanController::class, 'deleteWorkoutPlan'])->name('deleteWorkoutPlan');
    Route::get('/workouts/plans', [WorkoutPlanController::class, 'getWorkoutPlans'])->name('getWorkoutPlans');
    Route::get('/workouts/plans/{id}/details', [WorkoutPlanController::class, 'getWorkoutPlan'])->name('getWorkoutPlan');
});

//workout endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/workouts/add', [WorkoutController::class, 'addWorkout'])->name('createWorkoutPlan');
    Route::get('/workouts', [WorkoutController::class, 'getWorkouts'])->name('getWorkoutPlans');
});


//exercise endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/exercises/body_parts', [ExerciseController::class, 'getBodyParts'])->name('getBodyParts');
    Route::get('/exercises/muscles', [ExerciseController::class, 'getMuscles'])->name('getMuscles');
    Route::get('/exercises', [ExerciseController::class, 'getExercises'])->name('getExercises');
    Route::get('/exercises/{id}/details', [ExerciseController::class, 'getExerciseDetails'])->name('getExerciseDetails');
});

// stats endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/stats/macros/today', [StatsController::class, 'getTodaysMacros'])->name('getTodaysMacros');
    Route::get('/stats/macros/monthly', [StatsController::class, 'getMonthlyMacroStats'])->name('getMonthlyMacroStats');
    Route::get('/stats/workout/monthly', [StatsController::class, 'getMonthlyWorkoutStats'])->name('getMonthlyWorkoutStats');

});

//user endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/preferences', [UserController::class, 'getUserPreferences'])->name('getUserMacroPreferences');
    Route::put('/user/macros/update', [UserController::class, 'updateUserMacroPreferences'])->name('updateUserMacroPreferences');
    Route::put('/user/language/update', [UserController::class, 'updateUserLanguagePreference'])->name('updateUserLanguagePreference');
    Route::get('/user/details', [UserController::class, 'userDetails'])->name('userDetails');
    Route::put('/user/biometrics', [UserController::class, 'updateUserBiometrics'])->name('updateUserBiometrics');
    Route::get('/user/biometrics', [UserController::class, 'getUserBiometrics'])->name('getUserBiometrics');
    Route::get('/user/remaining-macros',[UserController::class, 'getRemainingMacros'])->name('getRemainingMacros');
});



