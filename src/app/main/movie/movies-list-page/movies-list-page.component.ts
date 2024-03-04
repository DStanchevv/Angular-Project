import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-list-page.component.html',
})
export class MoviesListPageComponent implements OnInit{
  constructor(private movieService: MovieService) {}

  movies: Movie[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies; console.log(this.movies[0].images)
    })

    setTimeout(() => {
      this.isLoading = false;
    }, 2000)
  }
}
