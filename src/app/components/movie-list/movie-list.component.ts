import { Component, OnInit } from "@angular/core";
import { Movie } from "../../movie";
import { MovieService } from "../../services/movie.service";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"]
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  constructor(private movieService: MovieService) {}

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => (this.movies = movies));
  }

  remove(movie) {
    this.movieService.removeMovie(movie.id);
  }

  ngOnInit() {
    this.getMovies();
  }
}
