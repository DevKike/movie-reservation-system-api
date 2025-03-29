import { Module } from '@nestjs/common';
import { AuthService } from './infrastructure/service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './infrastructure/entity/auth.entity';
import { CONSTANT } from 'src/common/constants/constant';
import { AuthController } from './infrastructure/controller/auth.controller';
import { IAuthService } from './domain/interfaces/service/auth.service.interface';
import { SignOnAdminUseCase } from './application/sign-on-admin.use-case';
import { UsersModule } from '../users/users.module';
import { IUsersService } from '../users/domain/interfaces/service/users.service.interface';
import { RolesModule } from '../roles/roles.module';
import { IRolesService } from '../roles/domain/interfaces/service/roles.service.interface';
import { IHashService } from '../common/domain/services/interfaces/hash/hash.provider.interface';
import { SharedModule } from 'src/shared/shared.module';
import { SignOnUserUseCase } from './application/sign-on-user.use-case';

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
      provide: CONSTANT.PROVIDERS.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: CONSTANT.USE_CASES.SIGN_ON_ADMIN,
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
        CONSTANT.PROVIDERS.AUTH_SERVICE,
        CONSTANT.PROVIDERS.ROLES_SERVICE,
        CONSTANT.PROVIDERS.USERS_SERVICE,
        CONSTANT.PROVIDERS.HASH_SERVICE,
      ],
    },
    {
      provide: CONSTANT.USE_CASES.SIGN_ON_USER,
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
        CONSTANT.PROVIDERS.AUTH_SERVICE,
        CONSTANT.PROVIDERS.ROLES_SERVICE,
        CONSTANT.PROVIDERS.USERS_SERVICE,
        CONSTANT.PROVIDERS.HASH_SERVICE,
      ],
    },
  ],
  exports: [CONSTANT.PROVIDERS.AUTH_SERVICE],
})
export class AuthModule {}
