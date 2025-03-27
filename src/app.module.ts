import { Module } from '@nestjs/common';
import { UsersModule } from './lib/users/users.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, UsersModule],
  controllers: [],
})
export class AppModule {}
