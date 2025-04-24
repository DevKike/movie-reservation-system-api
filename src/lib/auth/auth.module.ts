import { Module } from '@nestjs/common';
import { AuthService } from './infrastructure/service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './infrastructure/entity/auth.entity';
import { CONSTANT } from 'src/common/constants/constant';
import { AuthController } from './infrastructure/controller/auth.controller';
import { IAuthService } from './domain/interfaces/service/auth.service.interface';
import { SignOnAdminUseCase } from './application/sign-up-admin.use-case';
import { UsersModule } from '../users/users.module';
import { IUsersService } from '../users/domain/interfaces/service/users.service.interface';
import { RolesModule } from '../roles/roles.module';
import { IRolesService } from '../roles/domain/interfaces/service/roles.service.interface';
import { IHashService } from '../common/domain/services/interfaces/hash/hash.service.interface';
import { SharedModule } from 'src/shared/shared.module';
import { SignOnUserUseCase } from './application/sign-up-user.use-case';
import { SignInUseCase } from './application/sign-in-.use-case';
import { IJwtService } from '../common/domain/services/interfaces/jwt/jwt.service.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    RolesModule,
    UsersModule,
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: CONSTANT.USE_CASES.AUTH.SIGN_UP_ADMIN,
      useFactory: (
        authService: IAuthService,
        rolesService: IRolesService,
        usersService: IUsersService,
        hashService: IHashService,
      ) =>
        new SignOnAdminUseCase(
          authService,
          rolesService,
          usersService,
          hashService,
        ),
      inject: [
        CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE,
        CONSTANT.PROVIDERS.ROLE.ROLES_SERVICE,
        CONSTANT.PROVIDERS.USER.USERS_SERVICE,
        CONSTANT.PROVIDERS.AUTH.HASH_SERVICE,
      ],
    },
    {
      provide: CONSTANT.USE_CASES.AUTH.SIGN_UP_USER,
      useFactory: (
        authService: IAuthService,
        rolesService: IRolesService,
        usersService: IUsersService,
        hashService: IHashService,
      ) =>
        new SignOnUserUseCase(
          authService,
          rolesService,
          usersService,
          hashService,
        ),
      inject: [
        CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE,
        CONSTANT.PROVIDERS.ROLE.ROLES_SERVICE,
        CONSTANT.PROVIDERS.USER.USERS_SERVICE,
        CONSTANT.PROVIDERS.AUTH.HASH_SERVICE,
      ],
    },
    {
      provide: CONSTANT.USE_CASES.AUTH.SIGN_IN,
      useFactory: (
        authService: IAuthService,
        hashService: IHashService,
        jwtService: IJwtService,
      ) => new SignInUseCase(authService, hashService, jwtService),
      inject: [
        CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE,
        CONSTANT.PROVIDERS.AUTH.HASH_SERVICE,
        CONSTANT.PROVIDERS.AUTH.JWT_SERVICE,
      ],
    },
  ],
  exports: [CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE],
})
export class AuthModule {}
