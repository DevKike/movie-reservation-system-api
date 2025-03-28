import { Controller, Get, Inject } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { IRolesUseCase } from '../../domain/interfaces/use-case/roles.use-case.interface';
import { IRole } from '../../domain/interfaces/entity/roles.entity.interface';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(CONSTANT.USE_CASES.GET_ALL_ROLES)
    private readonly _getAllRolesUseCase: IRolesUseCase<IRole[]>,
  ) {}

  @Get()
  async getAll(): Promise<IRole[]> {
    return await this._getAllRolesUseCase.execute();
  }
}
