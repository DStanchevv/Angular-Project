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
  dropdownStyles = "absolute hidden z-10 visible bg-gray-700 divide-y divide-white-100 rounded-md w-44";
  movies: Movie[] = [];
  isLoading: boolean = true;

  onSearchChange() {
    this.movieService.searchMoviesByName(this.searchTerm).subscribe((movies) => {
      this.movies = movies;
    })
  }

  filterButtonOnHover() {
    this.dropdownStyles = "absolute z-10 visible bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700";
  }

  relDateAsc() {
    this.movieService.getMoviesByDateAsc().subscribe((movies) => {
      this.movies = movies;
    })
  }

  relDateDesc() {
    this.movieService.getMoviesByDateDesc().subscribe((movies) => {
      this.movies = movies;
    })
  }

  nameAsc() {
    this.movieService.getMoviesByNameAsc().subscribe((movies) => {
      this.movies = movies;
    })
  }

  nameDesc() {
    this.movieService.getMoviesByNameDesc().subscribe((movies) => {
      this.movies = movies;
    })
  }

  filterButtonOnHoverOut() {
    this.dropdownStyles = "absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700";
  }

  ngOnInit(): void {
    this.movieService.getMoviesByDateAsc().subscribe((movies) => {
      this.movies = movies;
    })

    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }
}
