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

  get role() {
    if(this.isLoggedIn)
        return this.userService.user?.role;
    else return "";
  }

  movie = {} as Movie;
  images: Array<object> = []
  isLoading: boolean = true;
  commentsOpened: boolean = false;
  ratingFormOpened: boolean = false;
  ratingFormOpenedClass: string = "";
  currPage: number = 1;
  perPage: number = 2;

  errMessage: string = "";
  succMessage: string = "";

  showSuccessMessage(message: string) {
    this.succMessage = message;

    setTimeout(() => {
      this.succMessage = '';
    }, 1500);
  }

  showErrMessage(message: string) {
    this.errMessage = message;

    setTimeout(() => {
      this.errMessage = '';
    }, 1500);
  }

  toggleComments() {
    this.commentsOpened = !this.commentsOpened;
  }

  submitComment(form: NgForm) {
    const commentText = form.value.movieComment;
    const movieId = this.movie.id;

    if(commentText.trim().length > 0) {
      this.movieService.commentMovie(movieId, commentText).subscribe({
        next: (response) => {
          console.log('Comment posted successfully', response);
          form.reset();
          this.movieService.getMovieById(this.movie.id).subscribe((movie) => {
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
          this.showSuccessMessage("Comment posted!")
        },
        error: (error) => {
          this.showErrMessage("Can't submit the same comment twice!")
        }
      });
    }
  }

  submitBtnRating(score: number) {
    this.showAndCloseRatingForm();
    this.movieService.rateMovie(this.movie.id, score).subscribe({
      next: (response) => {
        console.log('Comment posted successfully', response);
        this.movieService.getMovieById(this.movie.id).subscribe((movie) => {
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
        this.showSuccessMessage("Rating sent!")
      },
      error: (error) => {
          this.movieService.updateRating(this.movie.id, score).subscribe({
            next: (response) => {
              console.log('Comment updated successfully', response);
              this.movieService.getMovieById(this.movie.id).subscribe((movie) => {
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
              this.showSuccessMessage("Rating updated!")
            },
            error: (error) => {
              this.showErrMessage("Rating was not submitted!")
            }
          })
        }
      })
  }

  deleteComment($event: any) {
    console.log($event.target.id)
    this.movieService.deleteComment($event.target.id).subscribe({
      next: (response) => {
        console.log('Comment deleted successfully', response);
        this.movieService.getMovieById(this.movie.id).subscribe((movie) => {
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
        this.showSuccessMessage("Comment deleted!")
      },
      error: (error) => {
        this.showErrMessage("Comment was not deleted!")
      }
    })
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
    console.log("asdasdasdasdsaasfasfasfasfas")
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
