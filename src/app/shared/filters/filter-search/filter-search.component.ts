import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription, catchError, of } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
})
export class FilterSearchComponent implements OnDestroy{
  isLoggedIn!: boolean;
  private authSubscription: Subscription;

  constructor(private movieService: MovieService, private userService: UserService) {
    this.authSubscription = this.userService.isAuthenticated.subscribe(
      authenticated => {
          this.isLoggedIn = authenticated;
      }
    );
  }

  get role() {
    if(this.isLoggedIn)
        return this.userService.user?.role;
    else return "";
  }

  @Input('movies') movies = [] as Movie[];
  @Output() updatedMovies = new EventEmitter<Movie[]>();
  searchTerm: string = '';
  dropdownStyles = "absolute hidden z-10 visible bg-gray-700 divide-y divide-white-100 rounded w-44";
  
  onSearchChange() {
    if(this.searchTerm.length > 0) {
      this.movieService.searchMoviesByName(this.searchTerm).pipe(
        catchError((error) => {
          console.log(error)
          return of([])
        })
      ).subscribe((movies) => {
        this.movies = movies;
        this.updatedMovies.emit(this.movies);
      })
    }
  }

  filterButtonOnHover() {
    this.dropdownStyles = "absolute z-10 visible bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700";
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

  idDesc() {
    this.movieService.getMoviesByIdDesc().subscribe((movies) => {
      this.movies = movies;
      this.updatedMovies.emit(movies);
    })
  }

  filterButtonOnHoverOut() {
    this.dropdownStyles = "absolute z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700";
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
