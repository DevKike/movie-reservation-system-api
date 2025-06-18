import { IUseCase } from 'src/lib/common/domain/interfaces/use-case/use-case.interface';
import {
  IUpdateMovieReq,
  IUpdateMovieRes,
} from '../domain/interfaces/entity/movies.entity.interface';
import { IMoviesService } from '../domain/interfaces/service/movies.service.interface';
import { IUsersService } from 'src/lib/users/domain/interfaces/service/users.service.interface';
import { ROLE } from 'src/lib/roles/domain/enums/roles.enum';
import { ForbiddenException } from 'src/common/exceptions/forbidden-exception';

export class UpdateMovieUseCase
  implements IUseCase<IUpdateMovieReq, IUpdateMovieRes>
{
  constructor(
    private readonly usersService: IUsersService,
    private readonly _moviesService: IMoviesService,
  ) {}

  async execute(input: IUpdateMovieReq): Promise<IUpdateMovieRes> {
    const { userId, movieId, ...data } = input;

    const user = await this.usersService.getById(userId);

    if (user.role.name !== ROLE.ADMIN)
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );

    const movie = await this._moviesService.getById(movieId);

    const updatedData = await this._moviesService.update({ ...movie }, data);

    return {
      movie: updatedData,
    };
  }
}
