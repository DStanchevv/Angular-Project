import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../services/types/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  constructor(private movieService: MovieService) {}

  movies: Movie[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.movieService.getMoviesByDateDesc().subscribe((movies) => {
      this.movies = movies.slice(0, 4);
    })

    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }
}
