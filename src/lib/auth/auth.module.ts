import { Module } from '@nestjs/common';
import { AuthService } from './infrastructure/service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './infrastructure/entity/auth.entity';
import { CONSTANT } from 'src/common/constants/constant';
import { AuthController } from './infrastructure/controller/auth.controller';
import { IAuthService } from './domain/interfaces/service/auth.service.interface';
import { SignInAdminUseCase } from './application/sign-in-admin.use-case';
import { UsersModule } from '../users/users.module';
import { IUserService } from '../users/domain/interfaces/service/users.service.interface';
import { RolesModule } from '../roles/roles.module';
import { IRolesService } from '../roles/domain/interfaces/service/roles.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), RolesModule, UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: CONSTANT.PROVIDERS.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: CONSTANT.USE_CASES.SIGN_IN_ADMIN,
      useFactory: (
        authService: IAuthService,
        rolesService: IRolesService,
        usersService: IUserService,
      ) => new SignInAdminUseCase(authService, rolesService, usersService),
      inject: [
        CONSTANT.PROVIDERS.AUTH_SERVICE,
        CONSTANT.PROVIDERS.ROLES_SERVICE,
        CONSTANT.PROVIDERS.USERS_SERVICE,
      ],
    },
  ],
  exports: [CONSTANT.PROVIDERS.AUTH_SERVICE],
})
export class AuthModule {}
