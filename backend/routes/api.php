<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\WorkoutPlanController;
use App\Http\Controllers\ExerciseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return 'Database connection successful!';
    } catch (\Exception $e) {
        return 'Could not connect to the database. Please check your configuration.';
    }
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('/finish-account', [AuthController::class, 'addAdditionalData'])->name('addAdditionalData');
        Route::get('/userDetails', [UserController::class, 'userDetails'])->name('userDetails');
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

//exercise endpoints

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/exercises/body_parts', [ExerciseController::class, 'getBodyParts'])->name('getBodyParts');
    Route::get('/exercises', [ExerciseController::class, 'getExercises'])->name('getExercises');
    Route::get('/exercises/{id}/details', [ExerciseController::class, 'getExerciseDetails'])->name('getExerciseDetails');
});


