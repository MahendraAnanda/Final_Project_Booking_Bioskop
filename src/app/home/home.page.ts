import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { MovieService } from '../services/movie.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  movies : any[] = [];

  constructor(private movieService: MovieService) {}

  loadMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }

  ngOnInit() { 
    this.username = localStorage.getItem('name') || '';
    this.loadMovies();
   }
}
