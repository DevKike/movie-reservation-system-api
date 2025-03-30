import { Module } from '@nestjs/common';
import { UsersModule } from './lib/users/users.module';
import { CoreModule } from './core/core.module';
import { RolesModule } from './lib/roles/roles.module';
import { AuthModule } from './lib/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CONSTANT } from './common/constants/constant';
import { AuthGuard } from './lib/auth/infrastructure/guards/auth/auth.guard';

@Module({
  providers: [
    {
      provide: CONSTANT.PROVIDERS.APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [CoreModule, UsersModule, RolesModule, AuthModule, SharedModule],
  controllers: [],
})
export class AppModule {}
