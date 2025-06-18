import { Controller, Get, Inject } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { IGetRolesRes } from '../../domain/interfaces/entity/roles.entity.interface';
import { Roles } from 'src/lib/auth/infrastructure/decorators/roles/roles.decorator';
import { ROLE } from '../../domain/enums/roles.enum';
import { IUseCase } from 'src/lib/common/domain/interfaces/use-case/use-case.interface';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(CONSTANT.USE_CASES.ROLE.GET_ALL_ROLES)
    private readonly _getAllRolesUseCase: IUseCase<void, IGetRolesRes>,
  ) {}

  @Get()
  @Roles(ROLE.ROOT)
  async getAll(): Promise<IGetRolesRes> {
    return await this._getAllRolesUseCase.execute();
  }
}
