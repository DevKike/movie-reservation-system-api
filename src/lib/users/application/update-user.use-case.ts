import {
  IUser,
  IUpdateUser,
} from '../domain/interfaces/entity/users.entity.interface';
import { IUsersService } from '../domain/interfaces/service/users.service.interface';
import { IUseCase } from 'src/lib/common/domain/interfaces/use-case/use-case.interface';

export class UpdateUserUseCase implements IUseCase<IUpdateUser, IUser> {
  constructor(private readonly _usersService: IUsersService) {}

  async execute(input: IUpdateUser): Promise<IUser> {
    return await this._usersService.update(input.userId, input.userData);
  }
}
