<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPreferences;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', Password::min(8)],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        };

        $user = User::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'onboarding' => 'false',
        ]);

        $userPreferences = UserPreferences::create([
            'user_id' => $user->id,
            'calories' => 2000,
            'protein' => 150,
            'carbs' => 200,
            'fat' => 50,
            'fiber' => 30,
            'sugar' => 30,
            'selected_language' => 'en',
        ]);

        return response()->json([
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials!'
            ], 422);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Successfully logged in.',
            'access_token' => $token,
            'user' => $user,
        ], 200);
    }

    public function addAdditionalData(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'birth_date' => ['required', 'date'],
            'weight' => ['required', 'integer', 'max:255'],
            'height' => ['required', 'integer', 'max:255'],
            'gender' => ['required', 'string', 'max:255', Rule::in(['male', 'female', 'other'])],
            'goal' => ['required', 'string', 'max:255', Rule::in(['lose', 'lean', 'gain'])],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        };

        $user = $request->user();

        $user->update([
            'birth_date' => Carbon::parse($request->birth_date)->format('Y-m-d'),
            'weight' => $request->weight,
            'height' => $request->height,
            'gender' => $request->gender,
            'goal' => $request->goal,
            'onboarding' => 'true',
        ]);

        return response()->json([
            'message' => 'Additional data added',
        ], 200);
    }


    public function logout()
    {
        $request = request();

        $request->user()->tokens()->delete();

        return response()->json([
            "message" => "Logged out successfully."
        ]);
    }


}
