import {
  IMovie,
  ISaveMovie,
  IUpdateMovie,
} from '../entity/movies.entity.interface';

export interface IMoviesService {
  getAll(): Promise<IMovie[]>;
  getById(id: IMovie['id']): Promise<IMovie>;
  save(movie: ISaveMovie): Promise<IMovie>;
  update(movie: IMovie, data: IUpdateMovie): Promise<IMovie>;
  delete(id: IMovie['id']): Promise<void>;
}
