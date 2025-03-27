import { Module } from '@nestjs/common';
import { UsersService } from './infrastructure/service/users.service';

@Module({
  imports: [],
  providers: [UsersService],
})
export class UsersModule {}
