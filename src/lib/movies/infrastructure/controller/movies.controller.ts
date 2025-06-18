import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { IUseCase } from 'src/lib/common/domain/interfaces/use-case/use-case.interface';
import { AddMovieDTO } from '../dtos/add-movie.dto';
import {
  IAddMovieData,
  IGetAllMoviesRes,
  IMovie,
  IUpdateMovieReq,
  IUpdateMovieRes,
} from '../../domain/interfaces/entity/movies.entity.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUploadFile } from 'src/lib/common/domain/interfaces/providers/uploads/upload-file.interface';
import { ActiveUser } from 'src/lib/auth/infrastructure/decorators/auth/active-user.decorator';
import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';
import { UpdateMovieDTO } from '../dtos/update-movie.dto';
import { IPaginationQuery } from 'src/lib/common/domain/interfaces/query/pagination-query.interface';
import { PaginationQueryDTO } from '../dtos/pagination-query.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    @Inject(CONSTANT.USE_CASES.MOVIE.GET_ALL)
    private readonly _getAllMoviesUseCase: IUseCase<
      IPaginationQuery,
      IGetAllMoviesRes
    >,
    @Inject(CONSTANT.USE_CASES.MOVIE.GET_BY_ID)
    private readonly _getMovieByIdUseCase: IUseCase<IMovie['id'], IMovie>,
    @Inject(CONSTANT.USE_CASES.MOVIE.ADD)
    private readonly _addMovieUseCase: IUseCase<IAddMovieData, IMovie>,
    @Inject(CONSTANT.USE_CASES.MOVIE.UPDATE)
    private readonly _updateMovieUseCase: IUseCase<
      IUpdateMovieReq,
      IUpdateMovieRes
    >,
    @Inject(CONSTANT.USE_CASES.MOVIE.DELETE)
    private readonly _deleteMovieUseCase: IUseCase<IMovie['id'], void>,
  ) {}

  @Get()
  async getAll(@Query() query: PaginationQueryDTO) {
    return await this._getAllMoviesUseCase.execute(query);
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

  @Delete(':id')
  async delete(@Param('id') movieId: IMovie['id']) {
    return await this._deleteMovieUseCase.execute(movieId);
  }
}
