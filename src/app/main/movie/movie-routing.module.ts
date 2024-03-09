import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleMoviePageComponent } from './single-movie-page/single-movie-page.component';
import { MoviesListPageComponent } from './movies-list-page/movies-list-page.component';

const routes: Routes = [
    {
        path: 'movies',
        children: [
            {path: '', pathMatch: 'full', component: MoviesListPageComponent},
            {path: ':movieId', component: SingleMoviePageComponent}
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { 
  
}
