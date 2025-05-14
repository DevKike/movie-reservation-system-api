import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { IAuth } from 'src/lib/auth/domain/interfaces/entity/auth.entity.interface';
import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import { AddMovieDTO } from '../dtos/add-movie.dto';
import { IAddMovieData } from '../../domain/interfaces/entity/movies.entity.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUploadFile } from 'src/lib/common/domain/providers/interfaces/uploads/upload-file.interface';
import { ActiveUser } from 'src/lib/auth/infrastructure/decorators/auth/active-user.decorator';
import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';

@Controller('movies')
export class MoviesController {
  constructor(
    @Inject(CONSTANT.USE_CASES.MOVIE.ADD_MOVIE)
    private readonly _addMovieUseCase: IUseCase<IAddMovieData, IAuth>,
  ) {}

  @UseInterceptors(FileInterceptor(CONSTANT.KEYS.FILE))
  @Post('add')
  async addMovie(
    @ActiveUser('userId') userId: IUser['id'],
    @Body() data: AddMovieDTO,
    @UploadedFile() posterFile: Express.Multer.File,
  ): Promise<IAuth> {
    return await this._addMovieUseCase.execute({
      ...data,
      userId,
      posterFile: posterFile as IUploadFile,
    });
  }
}
