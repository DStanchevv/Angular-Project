import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';
import { dateValidator } from 'src/app/shared/utils/date-validator';

@Component({
  selector: 'app-movie-edit-page',
  templateUrl: './movie-edit-page.component.html',
})
export class MovieEditPageComponent implements OnInit{
  constructor(private movieService: MovieService, private activeRoute: ActivatedRoute, private fb: FormBuilder) {}
  movie = {} as Movie;
  images: Array<object> = []
  isLoading: boolean = true;
  form = {} as FormGroup
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe(data => {
      this.movieService.getMovieById(data['movieId']).subscribe((movie) => {
        console.log(movie)
        this.movie = {
          id: movie.id,
          name: movie.name,
          description: movie.description,
          releaseDate: movie.releaseDate,
          directorName: movie.directorName,
          length: movie.length,
          images: movie.images
        }
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

        this.form = this.fb.group({
          movieName: [this.movie.name, [Validators.required]],
          movieDescription: [this.movie.description, [Validators.required]],
          movieReleaseDate: [this.formatDate(this.movie.releaseDate), [Validators.required, dateValidator()]],
          movieDirector: [this.movie.directorName, [Validators.required]],
          movieLength: [this.movie.length, [Validators.required]]
        });

        this.isLoading = false;
      })
    })
  }
  
  saveMovie(): void {

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  }
}
