import { IPaginationQuery } from 'src/lib/common/domain/interfaces/query/pagination-query.interface';
import {
  IGetAllMoviesRes,
  IMovie,
  ISaveMovie,
  IUpdateMovie,
} from '../entity/movies.entity.interface';

export interface IMoviesService {
  getAll(paginationQuery: IPaginationQuery): Promise<IGetAllMoviesRes>;
  getById(id: IMovie['id']): Promise<IMovie>;
  save(movie: ISaveMovie): Promise<IMovie>;
  update(movie: IMovie, data: IUpdateMovie): Promise<IMovie>;
  delete(id: IMovie['id']): Promise<void>;
}
