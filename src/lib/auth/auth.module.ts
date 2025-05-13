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
import { IHashProvider } from '../common/domain/providers/interfaces/hash/hash.provider.interface';
import { SharedModule } from 'src/shared/shared.module';
import { SignOnUserUseCase } from './application/sign-up-user.use-case';
import { SignInUseCase } from './application/sign-in-.use-case';
import { IJwtProvider } from '../common/domain/providers/interfaces/jwt/jwt.provider.interface';
import { RefreshAuthUseCase } from './application/refresh-auth.use-case';

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
        hashService: IHashProvider,
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
        CONSTANT.PROVIDERS.AUTH.HASH_PROVIDER,
      ],
    },
    {
      provide: CONSTANT.USE_CASES.AUTH.SIGN_UP_USER,
      useFactory: (
        authService: IAuthService,
        rolesService: IRolesService,
        usersService: IUsersService,
        hashService: IHashProvider,
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
        CONSTANT.PROVIDERS.AUTH.HASH_PROVIDER,
      ],
    },
    {
      provide: CONSTANT.USE_CASES.AUTH.SIGN_IN,
      useFactory: (
        authService: IAuthService,
        hashService: IHashProvider,
        jwtProvider: IJwtProvider,
      ) => new SignInUseCase(authService, hashService, jwtProvider),
      inject: [
        CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE,
        CONSTANT.PROVIDERS.AUTH.HASH_PROVIDER,
        CONSTANT.PROVIDERS.AUTH.JWT_PROVIDER,
      ],
    },
    {
      provide: CONSTANT.USE_CASES.AUTH.REFRESH_AUTH,
      useFactory: (jwtProvider: IJwtProvider, authService: IAuthService) =>
        new RefreshAuthUseCase(jwtProvider, authService),
      inject: [
        CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE,
        CONSTANT.PROVIDERS.AUTH.HASH_PROVIDER,
        CONSTANT.PROVIDERS.AUTH.JWT_PROVIDER,
      ],
    },
  ],
  exports: [CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE],
})
export class AuthModule {}
