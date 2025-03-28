import {
  IUser,
  IUpdateUser,
} from '../domain/interfaces/entity/users.entity.interface';
import { IUsersUseCase } from '../domain/interfaces/use-case/users.use-case.interface';
import { IUserService } from '../domain/services/users.service.interface';

export class UpdateUserUseCase
  implements IUsersUseCase<IUser, IUser['id'], IUpdateUser>
{
  constructor(private readonly _userService: IUserService) {}

  async execute(id: IUser['id'], input: IUpdateUser): Promise<IUser> {
    return await this._userService.update(id, input);
  }
}
