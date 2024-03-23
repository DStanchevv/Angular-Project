import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListPageComponent } from './movies-list-page/movies-list-page.component';
import { MovieCardComponent } from './movies-list-page/movie-card/movie-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SingleMoviePageComponent } from './single-movie-page/single-movie-page.component';
import { MovieRoutingModule } from './movie-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    MoviesListPageComponent,
    MovieCardComponent,
    SingleMoviePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MovieRoutingModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class MovieModule { }
