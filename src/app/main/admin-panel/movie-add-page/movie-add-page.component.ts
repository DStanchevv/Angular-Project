import { HttpHeaders } from '@angular/common/http';
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

  errMessage: string = "";
  fileList!: FileList;

  showErrMessage(message: string) {
    this.errMessage = message;

    setTimeout(() => {
      this.errMessage = '';
    }, 1500);
  }
  
  form = this.fb.group({
    movieName: ['', [Validators.required]],
    movieDescription: ['', [Validators.required]],
    movieReleaseDate: ['', [Validators.required, dateValidator()]],
    movieDirector: ['', [Validators.required]],
    movieLength: ['', [Validators.required]],
    movieImages: [],
  })  
  
  onFileInputChange(event: any) {
    this.fileList = event.target.files;
  }

  addMovie(): void {
    const formData = new FormData();
    formData.append('Name', this.form.get('movieName')?.value || '');
    formData.append('Description', this.form.get('movieDescription')?.value || '');
    formData.append('ReleaseDate', this.form.get('movieReleaseDate')?.value || '');
    formData.append('DirectorName', this.form.get('movieDirector')?.value || '');
    formData.append('Length', this.form.get('movieLength')?.value || '');
    if(this.fileList) {
      Array.from(this.fileList).forEach((file) => {
        formData.append('files', file);
      })
    } else {
      this.showErrMessage("Invalid data!")
    }

    if(this.fileList) {
      this.movieService.addMovie(formData)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/admin-panel']);
        },
        error: (err) => {
          this.showErrMessage("Invalid data!")
        }
      });
    }
  }
}
