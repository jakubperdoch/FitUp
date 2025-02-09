<?php

namespace App\Http\Controllers;


use App\Models\UserPreferences;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{


    public function userDetails(Request $request)
    {
        return $request->user();
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

    public function getUserMacroPreferences(Request $request)
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
                Rule::in(['en', 'es', 'fr']),
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
            'user_preferences' => $userPreferences
        ], 200);
    }


}
