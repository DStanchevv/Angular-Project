import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { dateValidator } from 'src/app/shared/utils/date-validator';

@Component({
  selector: 'app-movie-add-page',
  templateUrl: './movie-add-page.component.html',
})
export class MovieAddPageComponent {
  constructor(private fb: FormBuilder, private movieService: MovieService, private router: Router) {}
  
  form = this.fb.group({
    movieName: ['', [Validators.required]],
    movieDescription: ['', [Validators.required]],
    movieReleaseDate: ['', [Validators.required, dateValidator()]],
    movieDirector: ['', [Validators.required]],
    movieLength: ['', [Validators.required]],
    movieImages: [],
  })

  addMovie(): void {
    const formData = new FormData();
    formData.append('Name', this.form.get('movieName')?.value || '');
    console.log(this.form.get('movieName')?.value)
    formData.append('Description', this.form.get('movieDescription')?.value || '');
    formData.append('ReleaseDate', this.form.get('movieReleaseDate')?.value || '');
    formData.append('DirectorName', this.form.get('movieDirector')?.value || '');
    formData.append('Length', this.form.get('movieLength')?.value || '');

    const files = this.form.get('movieImages')?.value || [];
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
      console.log(files[i]);
    }

    this.movieService.addMovie(formData)
    .subscribe({
      next: (res) => {
        this.router.navigate(['/admin-panel']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
