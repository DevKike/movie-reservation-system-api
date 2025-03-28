import { Module } from '@nestjs/common';
import { UsersModule } from './lib/users/users.module';
import { CoreModule } from './core/core.module';
import { RolesModule } from './lib/roles/roles.module';
import { SeederModule } from './seeds/seeder.module';

@Module({
  imports: [CoreModule, SeederModule, UsersModule, RolesModule],
  controllers: [],
})
export class AppModule {}
