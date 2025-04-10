<?php

namespace App\Http\Controllers;


use App\Models\Meal;
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
            'calories' => ['required', 'numeric', 'min:1'],
            'protein' => ['required', 'numeric', 'min:1'],
            'carbs' => ['required', 'numeric', 'min:1'],
            'fat' => ['required', 'numeric', 'min:1'],
            'fiber' => ['required', 'numeric'],
            'sugar' => ['required', 'numeric'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
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

    public function getRemainingMacros(Request $request)
    {
        $user= $request->user();
        $today = Carbon::now()->format('Y-m-d');

        $userPreferences= UserPreferences::where('user_id', $user->id)
            ->first();


        $meals = Meal::where('user_id', $user->id)
            ->where('date', '=', $today)
            ->get();

      $totalMacros = [
            'calories' => 0,
            'protein' => 0,
            'carbs' => 0,
            'fat' => 0,
            'fiber' => 0,
            'sugar' => 0,
        ];

      foreach ($meals as $meal) {
            $totalMacros['calories'] += $meal->calories;
            $totalMacros['protein'] += $meal->protein;
            $totalMacros['carbs'] += $meal->carbs;
            $totalMacros['fat'] += $meal->fat;
            $totalMacros['fiber'] += $meal->fiber;
            $totalMacros['sugar'] += $meal->sugar;
      }

        $remainingMacros = [
            'calories' => $userPreferences->calories - $totalMacros['calories'],
            'protein' => $userPreferences->protein - $totalMacros['protein'],
            'carbs' => $userPreferences->carbs - $totalMacros['carbs'],
            'fat' => $userPreferences->fat - $totalMacros['fat'],
            'fiber' => $userPreferences->fiber - $totalMacros['fiber'],
            'sugar' => $userPreferences->sugar - $totalMacros['sugar'],
        ];

        return response()->json([
            'message' => 'User Macro Preferences retrieved',
            'remaining_macros' => $remainingMacros,
        ]);
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

    public function getUserBiometrics()
    {
        $user = auth()->user();

        return response()->json([
            'weight' => $user->weight,
            'height' => $user->height,
            'gender'=>$user->gender,
            'goal'=>$user->goal,
            'age' => Carbon::parse($user->birth_date)->age,
        ]);

    }

    public function updateUserBiometrics(Request $request)
    {
        $user= $request->user();

        $validator=Validator::make($request->all(),[
            'gender' => ['string', 'max:255', Rule::in(['male', 'female', 'other'])],
            'goal' => ['string', 'max:255', Rule::in(['lose', 'lean', 'gain'])],
            'weight' => [ 'integer', 'max:255'],
            'height' => ['integer', 'max:255'],
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $user->update($request->all());

        return response()->json([
            'message' => 'User Preferences updated',
        ], 200);
    }


}
