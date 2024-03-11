import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
})
export class FilterSearchComponent {
  constructor(private movieService: MovieService) {}
  @Input('movies') movies = [] as Movie[];
  @Output() updatedMovies = new EventEmitter<Movie[]>();
  searchTerm: string = '';
  dropdownStyles = "absolute hidden z-10 visible bg-gray-700 divide-y divide-white-100 rounded-md w-44";
  
  onSearchChange() {
    this.movieService.searchMoviesByName(this.searchTerm).subscribe((movies) => {
      this.movies = movies;
      this.updatedMovies.emit(movies);
    })
  }

  filterButtonOnHover() {
    this.dropdownStyles = "absolute z-10 visible bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700";
  }

  relDateAsc() {
    this.movieService.getMoviesByDateAsc().subscribe((movies) => {
      this.movies = movies;
      this.updatedMovies.emit(movies);
    })
  }

  relDateDesc() {
    this.movieService.getMoviesByDateDesc().subscribe((movies) => {
      this.movies = movies;
      this.updatedMovies.emit(movies);
    })
  }

  nameAsc() {
    this.movieService.getMoviesByNameAsc().subscribe((movies) => {
      this.movies = movies;
      this.updatedMovies.emit(movies);
    })
  }

  nameDesc() {
    this.movieService.getMoviesByNameDesc().subscribe((movies) => {
      this.movies = movies;
      this.updatedMovies.emit(movies);
    })
  }

  filterButtonOnHoverOut() {
    this.dropdownStyles = "absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700";
  }
}
