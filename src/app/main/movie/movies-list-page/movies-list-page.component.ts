import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-list-page.component.html',
})
export class MoviesListPageComponent implements OnInit{
  constructor(private movieService: MovieService) {}

  searchTerm: string = '';
  dropdownStyles = "absolute hidden z-10 visible bg-gray-700 divide-y divide-white-100 rounded w-44";
  movies: Movie[] = [];
  isLoading: boolean = true;
  currPage: number = 1;
  perPage: number = 2;
  totalMovies: number = 0;
  anyMovieFound: boolean = false;

  handleUpdatedMovies(updatedMovies: Movie[]) {
    this.movies = updatedMovies;
  }

  ngOnInit(): void {
    this.movieService.getMoviesByDateDesc().subscribe((movies) => {
      this.movies = movies;
      this.totalMovies = this.movies.length;
    })

    this.isLoading = false;
  }
}
