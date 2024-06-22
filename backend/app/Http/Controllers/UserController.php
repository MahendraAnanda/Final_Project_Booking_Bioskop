<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user, 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token = auth()->user()->createToken('AuthToken')->plainTextToken;

        return response()->json(['token' => $token, 'name' => auth()->user()->name]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function googleLogin(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $googleUser = Http::get('https://www.googleapis.com/oauth2/v3/tokeninfo', [
            'id_token' => $request->token,
        ]);

        if ($googleUser->failed()) {
            return response()->json(['message' => 'Invalid Google token'], 401);
        }

        $googleUser = $googleUser->json();

        // Find or create the user
        $user = User::firstOrCreate(
            ['email' => $googleUser['email']],
            ['name' => $googleUser['name'], 'password' => Hash::make(uniqid())]
        );

        $token = $user->createToken('AuthToken')->plainTextToken;

        return response()->json(['token' => $token, 'name' => $user->name]);
    }
}
