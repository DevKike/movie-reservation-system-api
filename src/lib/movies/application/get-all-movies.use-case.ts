import { IUseCase } from 'src/lib/common/domain/interfaces/use-case/use-case.interface';
import { IPaginationQuery } from 'src/lib/common/domain/interfaces/query/pagination-query.interface';
import { IGetAllMoviesRes } from '../domain/interfaces/entity/movies.entity.interface';
import { IMoviesService } from '../domain/interfaces/service/movies.service.interface';

export class GetAllMoviesUseCase
  implements IUseCase<IPaginationQuery, IGetAllMoviesRes>
{
  constructor(private readonly _moviesService: IMoviesService) {}

  async execute(input: IPaginationQuery): Promise<IGetAllMoviesRes> {
    return await this._moviesService.getAll(input);
  }
}
