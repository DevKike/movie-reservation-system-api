import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { IUsersUseCase } from '../../domain/interfaces/use-case/users.use-case.interface';
import {
  IUser,
  IUpdateUser,
} from '../../domain/interfaces/entity/users.entity.interface';
import { UpdateUserDTO } from '../dtos/update-user';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('GetAllUsersUseCase')
    private readonly _getAllUsersUseCase: IUsersUseCase<IUser[]>,
    @Inject('GetUserUseCase')
    private readonly _getUserUseCase: IUsersUseCase<IUser, IUser['id']>,
    @Inject('UpdateUserUseCase')
    private readonly _updateUserUseCase: IUsersUseCase<
      IUser,
      IUser['id'],
      IUpdateUser
    >,
  ) {}

  @Get()
  async getAll(): Promise<IUser[]> {
    return await this._getAllUsersUseCase.execute();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    return await this._getUserUseCase.execute(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDTO,
  ): Promise<IUser> {
    return await this._updateUserUseCase.execute(id, data);
  }
}
