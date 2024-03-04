import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/services/types/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input('movie') movie = {} as Movie;
}
