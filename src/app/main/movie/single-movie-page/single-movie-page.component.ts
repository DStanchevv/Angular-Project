import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';

@Component({
  selector: 'app-single-movie-page',
  templateUrl: './single-movie-page.component.html',
})
export class SingleMoviePageComponent implements OnInit{
  constructor(private movieService: MovieService) {}

  movie: Movie = { id: 0, name: "", description: "", directorName: "", images: [], releaseDate: "", length: 0};
  images: Array<object> = []
  isLoading: boolean = true;

  ngOnInit(): void {
    this.movieService.getMovieById().subscribe((movie) => {
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

      console.log(this.images)
    })

    setTimeout(() => {
      this.isLoading = false;
    }, 2000)
  }
}
