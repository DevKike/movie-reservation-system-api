import {
  IMovie,
  ISaveMovie,
  IUpdateMovieData,
} from '../entity/movies.entity.interface';

export interface IMoviesService {
  getAll(): Promise<IMovie[]>;
  get(id: IMovie['id']): Promise<IMovie>;
  save(movie: ISaveMovie): Promise<IMovie>;
  update(id: IMovie['id'], data: IUpdateMovieData): Promise<IMovie>;
  delete(id: IMovie['id']): Promise<void>;
}
