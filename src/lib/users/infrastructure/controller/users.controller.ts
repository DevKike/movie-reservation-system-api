import { Body, Controller, Get, Inject, Patch } from '@nestjs/common';
import {
  IUser,
  IUpdateUser,
} from '../../domain/interfaces/entity/users.entity.interface';
import { UpdateUserDTO } from '../dtos/update-user';
import { CONSTANT } from 'src/common/constants/constant';
import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import { ActiveUser } from 'src/lib/auth/infrastructure/decorators/auth/active-user.decorator';
import { IAuth } from 'src/lib/auth/domain/interfaces/entity/auth.entity.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(CONSTANT.USE_CASES.USER.GET_ALL_USERS)
    private readonly _getAllUsersUseCase: IUseCase<void, IUser[]>,
    @Inject(CONSTANT.USE_CASES.USER.GET_USER)
    private readonly _getUserUseCase: IUseCase<IAuth['id'], IUser>,
    @Inject(CONSTANT.USE_CASES.USER.UPDATE_USER)
    private readonly _updateUserUseCase: IUseCase<IUpdateUser, IUser>,
  ) {}

  @Get()
  async getAll(): Promise<IUser[]> {
    return await this._getAllUsersUseCase.execute();
  }

  @Get()
  async get(@ActiveUser('sub') id: IAuth['id']): Promise<IUser> {
    return await this._getUserUseCase.execute(id);
  }

  @Patch()
  async update(
    @ActiveUser('sub') id: IUser['id'],
    @Body() data: UpdateUserDTO,
  ): Promise<IUser> {
    return await this._updateUserUseCase.execute({
      userId: id,
      userData: data,
    });
  }
}
