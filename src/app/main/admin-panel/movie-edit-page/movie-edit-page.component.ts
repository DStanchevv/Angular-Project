import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';
import { dateValidator } from 'src/app/shared/utils/date-validator';

@Component({
  selector: 'app-movie-edit-page',
  templateUrl: './movie-edit-page.component.html',
})
export class MovieEditPageComponent implements OnInit, OnDestroy{
  constructor(private movieService: MovieService, private activeRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) {}
  movie = {} as Movie;
  isLoading: boolean = true;
  form: FormGroup = this.fb.group({});
  movieSubscription!: Subscription
  
  ngOnInit(): void {
    this.movieSubscription = this.activeRoute.params.subscribe(data => {
      this.movieService.getMovieById(data['movieId']).subscribe((movie) => {
        this.movie = movie
  
        console.log("Movie name before form initialization:", this.movie.name);
  
        this.form = this.fb.group({
          movieName: [this.movie.name, [Validators.required]],
          movieDescription: [this.movie.description, [Validators.required]],
          movieReleaseDate: [this.formatDate(this.movie.releaseDate), [Validators.required, dateValidator()]],
          movieDirector: [this.movie.directorName, [Validators.required]],
          movieLength: [this.movie.length, [Validators.required]]
        });
  
        this.isLoading = false;
      });
    });
  }
  
  saveMovie($event: any): void {
    const formData = new FormData();
    formData.append('Name', this.form.get('movieName')?.value);
    formData.append('Description', this.form.get('movieDescription')?.value);
    formData.append('ReleaseDate', this.form.get('movieReleaseDate')?.value);
    formData.append('DirectorName', this.form.get('movieDirector')?.value);
    formData.append('Length', this.form.get('movieLength')?.value);

    
    this.movieService.updateMovie(formData, $event.target.id).subscribe({
      next: (res) => {
        this.router.navigate(['/admin-panel']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  }

  ngOnDestroy(): void {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
  }
}
