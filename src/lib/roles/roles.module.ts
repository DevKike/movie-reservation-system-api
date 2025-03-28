import { Module } from '@nestjs/common';
import { RolesService } from './infrastructure/service/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './infrastructure/entity/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
})
export class RolesModule {}
