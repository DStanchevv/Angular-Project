import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent {
  constructor(private movieService: MovieService) {}

  movies: Movie[] = [];
  isLoading: boolean = true;
  currPage: number = 1;
  perPage: number = 2;
  totalMovies: number = 0;

  handleUpdatedMovies(updatedMovies: Movie[]) {
    this.movies = updatedMovies;
  }

  ngOnInit(): void {
    this.movieService.getMoviesByDateAsc().subscribe((movies) => {
      this.movies = movies;
    })

    this.isLoading = false;
  }
}
