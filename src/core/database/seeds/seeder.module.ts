import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/lib/roles/infrastructure/entity/roles.entity';
import { RoleSeeder } from './roles/roles.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleSeeder],
})
export class SeederModule {}
