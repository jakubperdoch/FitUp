<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'full_name' => ['required', 'string', 'max:255'],
            'birth_date' => ['required', 'date'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:accounts'],
            'password' => ['required', 'string', Password::min(8)],
            'weight' => ['required', 'integer', 'max:255'],
            'height' => ['required', 'integer', 'max:255'],
            'gender' => ['required', 'string', 'max:255', Rule::in(['male', 'female', 'other'])],
            'goal' => ['required', 'string', 'max:255', Rule::in(['lose', 'lean', 'gain'])],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        };

        $user = User::create([
            'full_name' => $request->full_name,
            'birth_date' => $request->birth_date,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'weight' => $request->weight,
            'height' => $request->height,
            'gender' => $request->gender,
            'goal' => $request->goal,
        ]);

        return response()->json([
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        // Validation Rules
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:accounts,email'],
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

    public function me(Request $request)
    {
        return $request->user();
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
