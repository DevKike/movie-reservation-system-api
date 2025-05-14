import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { IAuth } from 'src/lib/auth/domain/interfaces/entity/auth.entity.interface';
import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import { AddMovieDTO } from '../dtos/add-movie.dto';
import { ISaveMovie } from '../../domain/interfaces/entity/movies.entity.interface';

@Controller('movies')
export class MoviesController {
  constructor(
    @Inject(CONSTANT.USE_CASES.MOVIE.ADD_MOVIE)
    private readonly _addMovieUseCase: IUseCase<ISaveMovie, IAuth>,
  ) {}

  @Post('add')
  async addMovie(@Body() data: AddMovieDTO): Promise<IAuth> {
    return await this._addMovieUseCase.execute(data);
  }
}
