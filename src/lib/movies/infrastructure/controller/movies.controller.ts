import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import { AddMovieDTO } from '../dtos/add-movie.dto';
import {
  IAddMovieData,
  IMovie,
  IUpdateMovieReq,
  IUpdateMovieRes,
} from '../../domain/interfaces/entity/movies.entity.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUploadFile } from 'src/lib/common/domain/providers/interfaces/uploads/upload-file.interface';
import { ActiveUser } from 'src/lib/auth/infrastructure/decorators/auth/active-user.decorator';
import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';
import { UpdateMovieDTO } from '../dtos/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    @Inject(CONSTANT.USE_CASES.MOVIE.GET_ALL)
    private readonly _getAllMoviesUseCase: IUseCase<void, IMovie[]>,
    @Inject(CONSTANT.USE_CASES.MOVIE.GET_BY_ID)
    private readonly _getMovieByIdUseCase: IUseCase<IMovie['id'], IMovie>,
    @Inject(CONSTANT.USE_CASES.MOVIE.ADD)
    private readonly _addMovieUseCase: IUseCase<IAddMovieData, IMovie>,
    @Inject(CONSTANT.USE_CASES.MOVIE.UPDATE)
    private readonly _updateMovieUseCase: IUseCase<
      IUpdateMovieReq,
      IUpdateMovieRes
    >,
  ) {}

  @Get('')
  async getAll() {
    return await this._getAllMoviesUseCase.execute();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: IMovie['id']) {
    return await this._getMovieByIdUseCase.execute(id);
  }

  @UseInterceptors(FileInterceptor(CONSTANT.KEYS.FILE))
  @Post('add')
  async add(
    @ActiveUser('userId') userId: IUser['id'],
    @Body() data: AddMovieDTO,
    @UploadedFile() posterImage: Express.Multer.File,
  ): Promise<IMovie> {
    return await this._addMovieUseCase.execute({
      ...data,
      userId,
      posterImage: posterImage as IUploadFile,
    });
  }

  @Patch(':id')
  async update(
    @ActiveUser('userId') userId: IUser['id'],
    @Param('id', ParseIntPipe) movieId: number,
    @Body() data: UpdateMovieDTO,
  ) {
    return await this._updateMovieUseCase.execute({
      userId,
      movieId,
      ...data,
    });
  }
}
