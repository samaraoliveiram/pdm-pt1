import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { Movie } from "../movie";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

const Movies: Movie[] = [
  { id: 11, name: "Dr Nice", imdb: 6 },
  { id: 12, name: "Narco", imdb: 7 },
  { id: 13, name: "Bombasto", imdb: 8 },
  { id: 14, name: "Celeritas", imdb: 9 },
  { id: 15, name: "Magneta", imdb: 9 },
  { id: 16, name: "RubberMan", imdb: 9 },
  { id: 17, name: "Dynama", imdb: 9 },
  { id: 18, name: "Dr IQ", imdb: 9 },
  { id: 19, name: "Magma", imdb: 8 },
  { id: 20, name: "Tornado", imdb: 6 }
];

@Injectable({
  providedIn: "root"
})
export class MovieService {
  private moviesCollection: AngularFirestoreCollection<Movie>;
  private movies: Observable<Movie[]>;

  constructor(db: AngularFirestore) {
    this.moviesCollection = db.collection<Movie>("movies");

    this.movies = this.moviesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getMovies(): Observable<Movie[]> {
    return this.movies;
  }

  getMovie(id) {
    return this.moviesCollection.doc<Movie>(id).valueChanges();
  }

  updateMovie(movie: Movie, id: string) {
    return this.moviesCollection.doc(id).update(movie);
  }

  addMovie(movie: Movie) {
    return this.moviesCollection.add(movie);
  }

  removeMovie(id) {
    return this.moviesCollection.doc(id).delete();
  }
}
