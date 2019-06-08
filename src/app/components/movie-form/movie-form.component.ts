import { Component, OnInit } from "@angular/core";
import { Movie } from "../../movie";
import { ActivatedRoute } from "@angular/router";
import { NavController, LoadingController } from "@ionic/angular";
import { MovieService } from "src/app/services/movie.service";

@Component({
  selector: "app-movie-form",
  templateUrl: "./movie-form.component.html",
  styleUrls: ["./movie-form.component.scss"]
})
export class MovieFormComponent implements OnInit {
  movie: Movie = {
    name: "",
    imdb: 0
  };

  movieId = null;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private movieService: MovieService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.params["id"];
    if (this.movieId) {
      this.loadMovie();
    }
  }

  onPhoted(foto: string) {
    var corta = foto;
    this.movie.img = foto;
    console.log(foto.length);
  }

  async loadMovie() {
    const loading = await this.loadingController.create({
      message: "Loading movie.."
    });
    await loading.present();

    this.movieService.getMovie(this.movieId).subscribe(res => {
      loading.dismiss();
      this.movie = res;
    });
  }

  async saveMovie() {
    const loading = await this.loadingController.create({
      message: "Saving Movie.."
    });
    await loading.present();

    if (this.movieId) {
      this.movieService
        .updateMovie(this.movie, this.movieId)
        .then(() => {
          loading.dismiss();
          this.nav.navigateBack("/tabs/tab1");
        })
        .catch(e => {
          console.log(e);
          loading.dismiss();
        });
    } else {
      this.movieService.addMovie(this.movie).then(() => {
        loading.dismiss();
        this.nav.navigateBack("/tabs/tab1");
      });
    }
  }
}
