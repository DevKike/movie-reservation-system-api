import { IMovie, ISaveMovie } from '../entity/movies.entity.interface';

export interface IMoviesService {
  // getAll(): Promise<IMovies[]>;
  // get(): Promise<IMovie>;
  save(movie: ISaveMovie): Promise<IMovie>;
}
