import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { dateValidator } from 'src/app/shared/utils/date-validator';

@Component({
  selector: 'app-movie-add-page',
  templateUrl: './movie-add-page.component.html',
})
export class MovieAddPageComponent {
  constructor(private fb: FormBuilder){}
  
  form = this.fb.group({
    movieName: ['', [Validators.required]],
    movieDescription: ['', [Validators.required]],
    movieReleaseDate: ['', [Validators.required, dateValidator()]],
    movieDirector: ['', [Validators.required]],
    movieLength: ['', [Validators.required]]
  })

  addMovie(): void {

  }
}
