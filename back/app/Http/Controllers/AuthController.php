<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'city' => $data['city'],
            'address' => $data['address']
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();
            $remember = $credentials['remember'] ?? false;
            unset($credentials['remember']);

            // Check if the user exists
            $user = User::where('email', $credentials['email'])->first();
            if (!$user) {
                return response()->json([
                    'error' => 'User does not exist.'
                ], 422);
            }

            if (!Auth::attempt($credentials, $remember)) {
                return response()->json([
                    'error' => 'The provided credentials are not valid.'
                ], 422);
            }

            // Handle successful login
            $user = Auth::user();
            $token = $user->createToken('main')->plainTextToken;

            return response([
                'user' => $user,
                'token' => $token
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error($e);

            // Return a generic error message
            return response()->json([
                'error' => 'An unexpected error occurred. Please try again later.'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            'success' => true
        ]);
    }
    
    public function me(Request $request)
    {
        return $request->user();
    }
}
