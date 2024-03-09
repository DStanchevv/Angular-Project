import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/services/types/movie';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
})
export class HomeCardComponent {
  @Input('movie') movie = {} as Movie;
}
