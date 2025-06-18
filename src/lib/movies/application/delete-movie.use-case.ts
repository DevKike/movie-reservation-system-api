import { IUseCase } from 'src/lib/common/domain/interfaces/use-case/use-case.interface';
import { IMovie } from '../domain/interfaces/entity/movies.entity.interface';
import { IMoviesService } from '../domain/interfaces/service/movies.service.interface';

export class DeleteMovieUseCase implements IUseCase<IMovie['id'], void> {
  constructor(private readonly _moviesService: IMoviesService) {}

  async execute(input: number): Promise<void> {
    return await this._moviesService.delete(input);
  }
}
