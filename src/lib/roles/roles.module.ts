import { Module } from '@nestjs/common';
import { RolesService } from './infrastructure/service/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './infrastructure/entity/roles.entity';
import { RolesController } from './infrastructure/controller/roles.controller';
import { CONSTANT } from 'src/common/constants/constant';
import { IRoleService } from './domain/interfaces/service/roles.service.interface';
import { GetAllRolesUseCase } from './application/get-all-roles.use.case';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [
    {
      provide: CONSTANT.PROVIDERS.ROLE_SERVICE,
      useClass: RolesService,
    },
    {
      provide: CONSTANT.USE_CASES.GET_ALL_ROLES,
      useFactory: (rolesService: IRoleService) =>
        new GetAllRolesUseCase(rolesService),
      inject: [CONSTANT.PROVIDERS.ROLE_SERVICE],
    },
  ],
  controllers: [RolesController],
})
export class RolesModule {}
