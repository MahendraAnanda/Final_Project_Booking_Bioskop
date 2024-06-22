import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movie: any = {};
  errorMessage: string = '';

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(movieId)) {
      // Handle the case where the movieId is not a valid number
      this.errorMessage = 'Invalid movieId';
      return;
    }
    this.movieService.getMovieById(movieId).subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}
