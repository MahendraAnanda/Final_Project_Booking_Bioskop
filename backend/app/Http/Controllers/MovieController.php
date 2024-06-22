<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index()
    {
        $movies = Movie::all()->map(function ($movie) {
            $movie->poster_path = url('storage/' . $movie->poster_path);
            return $movie;
        });
        return response()->json($movies);
    }
}
