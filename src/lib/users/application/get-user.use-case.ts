import { IUser } from '../domain/interfaces/entity/users.entity.interface';
import { IUsersUseCase } from '../domain/interfaces/use-case/users.use-case.interface';
import { IUsersService } from '../domain/interfaces/service/users.service.interface';

export class GetUserUseCase implements IUsersUseCase<IUser, IUser['id']> {
  constructor(private readonly _usersService: IUsersService) {}

  async execute(id: IUser['id']): Promise<IUser> {
    return await this._usersService.get(id);
  }
}
