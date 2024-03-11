import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { Movie } from "./types/movie";

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private http: HttpClient) { }

    getMoviesByDateAsc() {
        const { apiUrl } = environment

        return this.http.get<Movie[]>(`${apiUrl}/Movie/order-movie-by-release-date-asc`)
    }

    getMoviesByNameAsc() {
        const { apiUrl } = environment

        return this.http.get<Movie[]>(`${apiUrl}/Movie/order-movie-by-name-asc`)
    }

    getMoviesByNameDesc() {
        const { apiUrl } = environment

        return this.http.get<Movie[]>(`${apiUrl}/Movie/order-movie-by-name-desc`)
    }

    searchMoviesByName(name: string) {
        const { apiUrl } = environment

        return this.http.get<Movie[]>(`${apiUrl}/Movie/search-movie-by-name?movieName=${name}`)
    }

    getMoviesByDateDesc() {
        const { apiUrl } = environment

        return this.http.get<Movie[]>(`${apiUrl}/Movie/order-movie-by-release-date-desc`)
    }

    getMovieById(id: string) {
        const { apiUrl } = environment
        return this.http.get<Movie>(`${apiUrl}/Movie/get-movie/${id}`)
    }
}