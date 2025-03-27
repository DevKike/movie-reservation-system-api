import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IUsersUseCase } from '../../domain/interfaces/use-case/users.use-case.interface';
import { IUser } from '../../domain/interfaces/entity/users.entity.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('GetAllUsersUseCase')
    private readonly _getAllUsersUseCase: IUsersUseCase<IUser[]>,
    @Inject('GetUserUseCase')
    private readonly _getUserUseCase: IUsersUseCase<IUser, IUser['id']>,
  ) {}

  @Get()
  async getAll(): Promise<IUser[]> {
    return await this._getAllUsersUseCase.execute();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<IUser> {
    return await this._getUserUseCase.execute(id);
  }
}
