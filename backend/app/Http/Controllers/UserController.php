<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
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
            'birth_date' => $request->birth_date,
            'weight' => $request->weight,
            'height' => $request->height,
            'gender' => $request->gender,
            'goal' => $request->goal,
            'onboarding' => true,
        ]);

        return response()->json([
            'message' => 'Additional data added',
        ], 200);


    }

    public function userDetails(Request $request)
    {
        return $request->user();
    }

}
