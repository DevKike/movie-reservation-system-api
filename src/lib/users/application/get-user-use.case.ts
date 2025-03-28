import { IUser } from '../domain/interfaces/entity/users.entity.interface';
import { IUsersUseCase } from '../domain/interfaces/use-case/users.use-case.interface';
import { IUserService } from '../domain/services/users.service.interface';

export class GetUserUseCase implements IUsersUseCase<IUser, IUser['id']> {
  constructor(private readonly _userService: IUserService) {}

  async execute(input: IUser['id']): Promise<IUser> {
    return await this._userService.get(input);
  }
}
