import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';

@Component({
  selector: 'app-movie-edit-page',
  templateUrl: './movie-edit-page.component.html',
})
export class MovieEditPageComponent implements OnInit{
  constructor(private movieService: MovieService, private activeRoute: ActivatedRoute) {}

  movie = {} as Movie;
  images: Array<object> = []
  isLoading: boolean = true;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(data => {
      this.movieService.getMovieById(data['movieId']).subscribe((movie) => {
        this.movie = movie;
        for(let img of movie.images) {
          let image = {
            image: img,
            thumbImage: img,
            alt: "movieImg",
            title: ""
          }
          if(image.image !== "") {
            this.images.push(image);
          }
        }
      })
    })
    
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }
}
