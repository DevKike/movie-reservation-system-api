import { Module } from '@nestjs/common';
import { UsersService } from './infrastructure/service/users.service';
import { UsersController } from './infrastructure/controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entity/users.entity';
import { GetAllUsersUseCase } from './application/get-all-users.use-case';
import { IUserService } from './domain/services/users.service.interface';
import { GetUserUseCase } from './application/get-user.use-case';
import { UpdateUserUseCase } from './application/update-users.use-case';

@Module({
  providers: [
    {
      provide: 'UsersService',
      useClass: UsersService,
    },
    {
      provide: 'GetAllUsersUseCase',
      useFactory: (usersService: IUserService) =>
        new GetAllUsersUseCase(usersService),
      inject: ['UsersService'],
    },
    {
      provide: 'GetUserUseCase',
      useFactory: (usersService: IUserService) =>
        new GetUserUseCase(usersService),
      inject: ['UsersService'],
    },
    {
      provide: 'UpdateUserUseCase',
      useFactory: (usersService: IUserService) =>
        new UpdateUserUseCase(usersService),
      inject: ['UsersService'],
    },
  ],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
