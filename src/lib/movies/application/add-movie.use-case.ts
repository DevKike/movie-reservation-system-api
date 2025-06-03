import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import {
  IAddMovieData,
  IAddMovieRes,
} from '../domain/interfaces/entity/movies.entity.interface';
import { IMoviesService } from '../domain/interfaces/service/movies.service.interface';
import { IUsersService } from 'src/lib/users/domain/interfaces/service/users.service.interface';
import { BadRequestException } from 'src/common/exceptions/bad-request.exception';
import { IUploadsService } from 'src/lib/common/domain/providers/interfaces/uploads/uploads.service.interface';
import { CONSTANT } from 'src/common/constants/constant';

export class AddMovieUseCase implements IUseCase<IAddMovieData, IAddMovieRes> {
  constructor(
    private readonly _moviesService: IMoviesService,
    private readonly _usersService: IUsersService,
    private readonly _uploadsService: IUploadsService,
  ) {}

  async execute(input: IAddMovieData): Promise<IAddMovieRes> {
    const userData = await this._usersService.get(input.userId);

    if (!userData) throw new BadRequestException('Bad request');

    const uploadedImageUrl = await this._uploadsService.uploadFile(
      input.posterImage,
      `${CONSTANT.KEYS.IMAGES_PATH}/${CONSTANT.KEYS.MOVIES_PATH}`,
    );

    const movie = await this._moviesService.save({
      title: input.title,
      description: input.description,
      genre: input.genre,
      showtimes: input.showtimes,
      posterUrl: uploadedImageUrl,
      createdBy: userData,
    });

    return {
      movie,
    };
  }
}
