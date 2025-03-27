import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './lib/users/users.module';

@Module({
  imports: [SharedModule, UsersModule],
  controllers: [],
})
export class AppModule {}
