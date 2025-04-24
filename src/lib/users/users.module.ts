import { Module } from '@nestjs/common';
import { UsersService } from './infrastructure/service/users.service';
import { UsersController } from './infrastructure/controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entity/users.entity';
import { GetAllUsersUseCase } from './application/get-all-users.use-case';
import { IUsersService } from './domain/interfaces/service/users.service.interface';
import { GetUserUseCase } from './application/get-user.use-case';
import { UpdateUserUseCase } from './application/update-users.use-case';
import { CONSTANT } from 'src/common/constants/constant';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: CONSTANT.PROVIDERS.USER.USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: CONSTANT.USE_CASES.USER.GET_ALL_USERS,
      useFactory: (usersService: IUsersService) =>
        new GetAllUsersUseCase(usersService),
      inject: [CONSTANT.PROVIDERS.USER.USERS_SERVICE],
    },
    {
      provide: CONSTANT.USE_CASES.USER.GET_USER,
      useFactory: (usersService: IUsersService) =>
        new GetUserUseCase(usersService),
      inject: [CONSTANT.PROVIDERS.USER.USERS_SERVICE],
    },
    {
      provide: CONSTANT.USE_CASES.USER.UPDATE_USER,
      useFactory: (usersService: IUsersService) =>
        new UpdateUserUseCase(usersService),
      inject: [CONSTANT.PROVIDERS.USER.USERS_SERVICE],
    },
  ],
  exports: [CONSTANT.PROVIDERS.USER.USERS_SERVICE],
})
export class UsersModule {}
