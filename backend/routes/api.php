<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MealController;

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

//    meals endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/add-meal', [MealController::class, 'addMeal'])->name('addMeal');
    Route::get('/meals', [MealController::class, 'getMeals'])->name('getMeals');
    Route::get('/meals/{id}/details', [MealController::class, 'getMealDetails'])->name('getMealDetails');
    Route::get('/refresh-token', [MealController::class, 'refreshToken'])->name('refreshToken');
});

