import { Controller, Get, Inject } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { IRolesUseCase } from '../../domain/interfaces/use-case/roles.use-case.interface';
import { IRole } from '../../domain/interfaces/entity/roles.entity.interface';
import { Roles } from 'src/lib/auth/infrastructure/decorators/roles/roles.decorator';
import { ROLE } from '../../domain/enums/roles.enum';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(CONSTANT.USE_CASES.ROLE.GET_ALL_ROLES)
    private readonly _getAllRolesUseCase: IRolesUseCase<IRole[]>,
  ) {}

  @Get()
  @Roles(ROLE.ROOT)
  async getAll(): Promise<IRole[]> {
    return await this._getAllRolesUseCase.execute();
  }
}
