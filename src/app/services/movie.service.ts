import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Movie } from "./types/movie";

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private http: HttpClient) { }

    getMoviesByDateAsc() {
        return this.http.get<Movie[]>(`/api/Movie/order-movie-by-release-date-asc`)
    }

    getMoviesByNameAsc() {
        return this.http.get<Movie[]>(`/api/Movie/order-movie-by-name-asc`)
    }

    getMoviesByNameDesc() {
        return this.http.get<Movie[]>(`/api/Movie/order-movie-by-name-desc`)
    }

    searchMoviesByName(name: string) {
        return this.http.get<Movie[]>(`/api/Movie/search-movie-by-name?movieName=${name}`)
    }

    getMoviesByDateDesc() {
        return this.http.get<Movie[]>(`/api/Movie/order-movie-by-release-date-desc`)
    }
    getMoviesByRatingDesc() {
        return this.http.get<Movie[]>(`/api/Movie/order-movie-by-rating-desc`)
    }
    getMoviesByIdDesc() {
        return this.http.get<Movie[]>(`/api/Movie/order-movie-by-id-desc`)
    }

    getMovieById(id: string) {
        return this.http.get<Movie>(`/api/Movie/get-movie/${id}`)
    }
    addMovie(formData: FormData) {     
        return this.http.post<Movie>('/api/Movie/create-movie', formData);
    }
    updateMovie(formData: FormData, id: string) {
        return this.http.put<Movie>(`/api/Movie/update-movie/${id}`, formData);
    }
    deleteMovie(id: string) {
        return this.http.delete<Movie>(`/api/Movie/delete-movie/${id}`);
    }
    commentMovie(id: string, comment: string) {
        return this.http.post<Movie>(`/api/Movie/write-comment/${id}`, { description: comment });
    }
    rateMovie(id: string, rating: number) {
        return this.http.post<Movie>(`/api/Movie/rate-movie/${id}?rating=${rating}`, {});
    }
    deleteComment(id: string) {
        return this.http.delete<Movie>(`/api/Movie/delete-comment?commentid=${id}`);
    }
    updateRating(id: string, rating: number) {
        return this.http.put<Movie>(`/api/Movie/update-rating/${id}?rating=${rating}`, {});
    }
    deleteImage(imgLink: string) {
        return this.http.delete<Movie>(`/api/Movie/delete-image?imgLink=${imgLink}`);
    }
}