import { IUser } from '../domain/interfaces/entity/users.entity.interface';
import { IUsersUseCase } from '../domain/interfaces/use-case/users.use-case.interface';
import { IUserService } from '../domain/interfaces/services/users.service.interface';

export class GetAllUsersUseCase implements IUsersUseCase<IUser[]> {
  constructor(private readonly _usersService: IUserService) {}

  async execute(): Promise<IUser[]> {
    return await this._usersService.getAll();
  }
}
