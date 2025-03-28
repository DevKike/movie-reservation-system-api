import { Module } from '@nestjs/common';
import { UsersService } from './infrastructure/service/users.service';
import { UsersController } from './infrastructure/controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entity/users.entity';
import { GetAllUsersUseCase } from './application/get-all-users.use-case';
import { IUserService } from './domain/interfaces/service/users.service.interface';
import { GetUserUseCase } from './application/get-user.use-case';
import { UpdateUserUseCase } from './application/update-users.use-case';
import { CONSTANT } from 'src/common/constants/constant';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: CONSTANT.PROVIDERS.USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: CONSTANT.USE_CASES.GET_ALL_USERS,
      useFactory: (usersService: IUserService) =>
        new GetAllUsersUseCase(usersService),
      inject: [CONSTANT.PROVIDERS.USERS_SERVICE],
    },
    {
      provide: CONSTANT.USE_CASES.GET_USER,
      useFactory: (usersService: IUserService) =>
        new GetUserUseCase(usersService),
      inject: [CONSTANT.PROVIDERS.USERS_SERVICE],
    },
    {
      provide: CONSTANT.USE_CASES.UPDATE_USER,
      useFactory: (usersService: IUserService) =>
        new UpdateUserUseCase(usersService),
      inject: [CONSTANT.PROVIDERS.USERS_SERVICE],
    },
  ],
  exports: [CONSTANT.PROVIDERS.USERS_SERVICE],
})
export class UsersModule {}
