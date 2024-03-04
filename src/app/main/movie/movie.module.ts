import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListPageComponent } from './movies-list-page/movies-list-page.component';
import { MovieCardComponent } from './movies-list-page/movie-card/movie-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MoviesListPageComponent,
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MoviesListPageComponent
  ]
})
export class MovieModule { }
