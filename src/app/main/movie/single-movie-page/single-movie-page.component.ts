import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/services/types/movie';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-movie-page',
  templateUrl: './single-movie-page.component.html',
})
export class SingleMoviePageComponent implements OnInit, OnDestroy{
  isLoggedIn!: boolean;
    private authSubscription: Subscription;
  constructor(private movieService: MovieService, private userService:UserService, private activeRoute: ActivatedRoute) {
    this.authSubscription = this.userService.isAuthenticated.subscribe(
      authenticated => {
        this.isLoggedIn = authenticated;
      }
    );
  }

  movie = {} as Movie;
  images: Array<object> = []
  isLoading: boolean = true;
  commentsOpened: boolean = false;
  ratingFormOpened: boolean = false;
  ratingFormOpenedClass: string = "";

  toggleComments() {
    this.commentsOpened = !this.commentsOpened;
  }

  submitComment(form: NgForm) {

  }

  submitRating(form: NgForm) {
    
  }

  showAndCloseRatingForm() {
    if(this.ratingFormOpened === false) {
      this.ratingFormOpenedClass = "brightness-50 pointer-events-none -z-50";
      this.ratingFormOpened = true;
    } else {
      this.ratingFormOpenedClass = "";
      this.ratingFormOpened = false;
    }
  }

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
    
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
