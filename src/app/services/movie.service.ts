import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { Movie } from "./types/movie";

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private http: HttpClient) { }

    getMovies() {
        const { apiUrl } = environment

        return this.http.get<Movie[]>(`${apiUrl}/Movie/get-all-movies`)
    }

    getMovieById() {
        const { apiUrl } = environment
        return this.http.get<Movie>(`${apiUrl}/Movie/get-movie/19`)
    }
}