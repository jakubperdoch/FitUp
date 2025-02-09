<?php

namespace App\Http\Controllers;


use App\Models\UserPreferences;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{


    public function userDetails(Request $request)
    {

        $today = Carbon::today()->format('Y-m-d');
        $userAge = Carbon::parse($request->user()->birth_date)->age;

        return response()->json([
            'userCredentials' => [
                'fullName' => $request->user()->full_name,
                'email' => $request->user()->email,
            ],
            'userBiometrics' => [
                'weight' => $request->user()->weight,
                'height' => $request->user()->height,
                'age' => $userAge,
            ],
            'gender' => $request->user()->gender,
            'goal' => $request->user()->goal,
        ]);
    }


    public function updateUserMacroPreferences(Request $request)
    {

        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'calories' => 'required|numeric',
            'protein' => 'required|numeric',
            'carbs' => 'required|numeric',
            'fat' => 'required|numeric',
            'fiber' => 'required|numeric',
            'sugar' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $userPreferences = UserPreferences::where('user_id', $user->id)
            ->first()
            ->update($request->all());


        return response()->json([
            'message' => 'User Macro Preferences updated',
            'user_preferences' => $userPreferences
        ], 200);
    }

    public function getUserPreferences(Request $request)
    {
        $user = $request->user();

        $userPreferences = UserPreferences::where('user_id', $user->id)->first();

        return response()->json([
            'message' => 'User Macro Preferences retrieved',
            'user_preferences' => $userPreferences
        ], 200);
    }


    public function updateUserLanguagePreference(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'selected_language' => [
                'required',
                Rule::in(['sk', 'en']),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $userPreferences = UserPreferences::where('user_id', $user->id)
            ->first()
            ->update($request->all());

        return response()->json([
            'message' => 'User Language Preference updated',
        ], 200);
    }


}
