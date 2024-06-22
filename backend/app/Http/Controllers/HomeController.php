<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index()
    {
        $client = new Client();
        $apiKey = env('TMDB_API_KEY');

        $response = $client->get("https://api.themoviedb.org/3/discover/movie?api_key={$apiKey}&language=en-US");
        $data = json_decode($response->getBody(), true);
        $movies = $data['results'];

        return view('home', ['movies' => $movies]);
    }

    public function save(Request $request)
    {
        try {
            $movie = new Movie();
            $movie->title = $request->input('title');
            $movie->original_title = $request->input('original_title');
            $movie->poster_path = $request->input('poster_path');
            $movie->vote_average = $request->input('vote_average'); // Ubah menjadi rating
            $movie->overview = $request->input('overview'); // Ubah menjadi description
            $movie->release_date = $request->input('release_date');

            $posterPath = $request->input('poster_path');
            Log::info('Poster Path: ' . $posterPath);

            $posterUrl = 'https://image.tmdb.org/t/p/w500' . $posterPath;
            $posterContents = Http::get($posterUrl)->body();
            Log::info('Poster content length: ' . strlen($posterContents));

            $posterStoragePath = 'posters/' . basename($posterPath);
            Storage::disk('public')->put($posterStoragePath, $posterContents);
            Log::info('Poster saved to: ' . $posterStoragePath);

            $movie->poster_path = $posterStoragePath;
            $movie->save();

            return response()->json(['success' => 'Movie saved successfully!']);
        } catch (\Exception $e) {
            Log::error('Error saving movie: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to save movie'], 500);
        }
    }
}
