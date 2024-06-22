@extends('main')

@section('title','Dashboard')

@section('breadcrumbs')
<div class="breadcrumbs">
    <div class="col-sm-4">
        <div class="page-header float-left">
            <div class="page-title">
                <h1>Dashboard</h1>
            </div>
        </div>
    </div>
    <div class="col-sm-8">
        <div class="page-header float-right">
            <div class="page-title">
                <ol class="breadcrumb text-right">
                    <li class="active"><i class="fa fa-dashboard"></i></li>
                </ol>
            </div>
        </div>
    </div>
</div>
@endsection

@section('content')
<div class="content mt-3">
    <div class="animated fadeIn">
        <div class="container">
            <div class="row">
                @foreach ($movies as $index => $movie)
                    <div class="col-md-3 mb-4">
                        <div class="card">
                            <img class="card-img-top" src="https://image.tmdb.org/t/p/w500{{ $movie['poster_path'] }}" alt="Card image cap">
                            <div class="card-body">
                                <h4 class="card-title mb-3">{{ $movie['title'] }}</h4>
                                <p class="card-text">{{ $movie['original_title'] }}</p>
                                <button class="btn btn-primary save-movie" 
                                        data-title="{{ $movie['title'] }}" 
                                        data-original-title="{{ $movie['original_title'] }}" 
                                        data-poster-path="{{ $movie['poster_path'] }}"
                                        data-voteAverage="{{ $movie['vote_average'] }}"
                                        data-overview="{{ $movie['overview'] }}"
                                        data-release-date="{{ $movie['release_date'] }}">
                                    Save to Database
                                </button>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.save-movie').forEach(function (button) {
        button.addEventListener('click', function () {
            let title = this.dataset.title;
            let originalTitle = this.dataset.originalTitle;
            let posterPath = this.dataset.posterPath;
            let voteAverage = this.dataset.voteaverage;
            let overview = this.dataset.overview;
            let releaseDate = this.dataset.releaseDate;

            fetch('{{ route('movies.save') }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({
                    title: title,
                    original_title: originalTitle,
                    poster_path: posterPath,
                    vote_average: voteAverage, // Tambahkan jika diperlukan
                    overview: overview, // Tambahkan jika diperlukan
                    release_date: releaseDate // Tambahkan jika diperlukan
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to save movie');
            })
            .then(data => {
                if (data.success) {
                    alert('Movie saved successfully!');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save movie');
            });
        });
    });
});
</script>
@endsection