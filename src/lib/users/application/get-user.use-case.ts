import { IUser } from '../domain/interfaces/entity/users.entity.interface';
import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import { IUsersService } from '../domain/interfaces/service/users.service.interface';

export class GetUserUseCase implements IUseCase<IUser['id'], IUser> {
  constructor(private readonly _usersService: IUsersService) {}

  async execute(id: IUser['id']): Promise<IUser> {
    return await this._usersService.getById(id);
  }
}
