import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../services/types/movie';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  constructor(private movieService: MovieService, private userService: UserService) {}

  movies: Movie[] = [];
  ratingSortedMovies: Movie[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.movieService.getMoviesByDateDesc().subscribe((movies) => {
      this.movies = movies.slice(0, 4);
    })
    this.movieService.getMoviesByRatingDesc().subscribe((movies) => {
      this.ratingSortedMovies = movies.slice(0, 4);
    })
    this.isLoading = false;
  }
}
