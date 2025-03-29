import {
  IUser,
  IUpdateUser,
} from '../domain/interfaces/entity/users.entity.interface';
import { IUsersUseCase } from '../domain/interfaces/use-case/users.use-case.interface';
import { IUsersService } from '../domain/interfaces/service/users.service.interface';

export class UpdateUserUseCase
  implements IUsersUseCase<IUser, IUser['id'], IUpdateUser>
{
  constructor(private readonly _usersService: IUsersService) {}

  async execute(id: IUser['id'], input: IUpdateUser): Promise<IUser> {
    return await this._usersService.update(id, input);
  }
}
