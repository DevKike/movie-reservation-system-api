import { Module } from '@nestjs/common';
import { UsersService } from './infrastructure/service/users.service';
import { UsersController } from './infrastructure/controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entity/users.entity';
import { GetAllUsersUseCase } from './application/get-all-users.use-case';
import { IUserService } from './domain/service/users.service.interface';
import { GetUserUseCase } from './application/get-user.use-case';
import { UpdateUserUseCase } from './application/update-users.use-case';
import { CONSTANT } from 'src/common/constants/constant';

@Module({
  providers: [
    {
      provide: CONSTANT.PROVIDERS.USER_SERVICE,
      useClass: UsersService,
    },
    {
      provide: CONSTANT.USE_CASES.GET_ALL_USERS,
      useFactory: (usersService: IUserService) =>
        new GetAllUsersUseCase(usersService),
      inject: [CONSTANT.PROVIDERS.USER_SERVICE],
    },
    {
      provide: CONSTANT.USE_CASES.GET_USER,
      useFactory: (usersService: IUserService) =>
        new GetUserUseCase(usersService),
      inject: [CONSTANT.PROVIDERS.USER_SERVICE],
    },
    {
      provide: CONSTANT.USE_CASES.UPDATE_USER,
      useFactory: (usersService: IUserService) =>
        new UpdateUserUseCase(usersService),
      inject: [CONSTANT.PROVIDERS.USER_SERVICE],
    },
  ],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [CONSTANT.PROVIDERS.USER_SERVICE],
})
export class UsersModule {}
