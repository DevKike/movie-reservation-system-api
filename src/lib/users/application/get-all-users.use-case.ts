import { IUser } from '../domain/interfaces/entity/users.entity.interface';
import { IUsersUseCase } from '../domain/interfaces/use-case/users.use-case.interface';
import { IUsersService } from '../domain/interfaces/service/users.service.interface';

export class GetAllUsersUseCase implements IUsersUseCase<IUser[]> {
  constructor(private readonly _usersService: IUsersService) {}

  async execute(): Promise<IUser[]> {
    return await this._usersService.getAll();
  }
}
