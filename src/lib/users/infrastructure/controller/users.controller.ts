import { Controller, Get, Inject } from '@nestjs/common';
import { IUsersUseCase } from '../../domain/interfaces/use-case/users.use-case.interface';
import { IUser } from '../../domain/interfaces/entity/users.entity.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('GetAllUsersUseCase')
    private readonly _getAllUsersUseCase: IUsersUseCase<IUser[]>,
  ) {}

  @Get()
  async getAll(): Promise<IUser[]> {
    return await this._getAllUsersUseCase.execute();
  }
}
