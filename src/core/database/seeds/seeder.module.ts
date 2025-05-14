import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/lib/roles/infrastructure/entity/roles.entity';
import { RoleSeeder } from './role/role.seeder';
import { User } from 'src/lib/users/infrastructure/entity/users.entity';
import { Auth } from 'src/lib/auth/infrastructure/entity/auth.entity';
import { UserSeeder } from './user/root-user.seeder';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from 'src/shared/shared.module';
import rootUserConfig from './user/config/root-user.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, Auth]),
    ConfigModule.forRoot({
      load: [rootUserConfig],
    }),
    SharedModule,
  ],
  providers: [RoleSeeder, UserSeeder],
})
export class SeederModule {}
