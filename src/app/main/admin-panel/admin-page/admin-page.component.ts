import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent {
  constructor(private movieService: MovieService, private router: Router) {}

  movies: Movie[] = [];
  isLoading: boolean = true;
  currPage: number = 1;
  perPage: number = 2;
  totalMovies: number = 0;

  handleUpdatedMovies(updatedMovies: Movie[]) {
    this.movies = updatedMovies;
  }

  deleteMovie($event: any) {
    console.log($event.target.id)
    this.movieService.deleteMovie($event.target.id).subscribe({
      next: (res) => {
        this.movieService.getMoviesByIdDesc().subscribe((movies) => {
          this.movies = movies;
        })
        this.router.navigate(['/admin-panel']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.movieService.getMoviesByIdDesc().subscribe((movies) => {
      this.movies = movies;
    })

    this.isLoading = false;
  }
}
