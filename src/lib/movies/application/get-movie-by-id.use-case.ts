import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import { IMovie } from '../domain/interfaces/entity/movies.entity.interface';
import { IMoviesService } from '../domain/interfaces/service/movies.service.interface';

export class GetMovieByIdUseCase implements IUseCase<IMovie['id'], IMovie> {
  constructor(private readonly _moviesService: IMoviesService) {}

  async execute(input: IMovie['id']): Promise<IMovie> {
    return await this._moviesService.getById(input);
  }
}
