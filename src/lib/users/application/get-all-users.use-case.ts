import { IUser } from '../domain/interfaces/entity/users.entity.interface';
import { IUsersService } from '../domain/interfaces/service/users.service.interface';
import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';

export class GetAllUsersUseCase implements IUseCase<void, IUser[]> {
  constructor(private readonly _usersService: IUsersService) {}

  async execute(): Promise<IUser[]> {
    return await this._usersService.getAll();
  }
}
