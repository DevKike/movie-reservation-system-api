import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import {
  IMovie,
  ISaveMovie,
} from '../domain/interfaces/entity/movies.entity.interface';
import { Inject } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { IMoviesService } from '../domain/interfaces/service/movies.service.interface';

export class AddMovieUseCase implements IUseCase<ISaveMovie, IMovie> {
  constructor(
    @Inject(CONSTANT.PROVIDERS.MOVIE.MOVIES_SERVICE)
    private readonly _moviesService: IMoviesService,
  ) {}

  async execute(input: ISaveMovie): Promise<IMovie> {
    return await this._moviesService.save(input);
  }
}
