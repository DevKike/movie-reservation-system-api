import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import { IGetRolesRes } from '../domain/interfaces/entity/roles.entity.interface';
import { IRolesService } from '../domain/interfaces/service/roles.service.interface';

export class GetAllRolesUseCase implements IUseCase<void, IGetRolesRes> {
  constructor(private readonly _rolesService: IRolesService) {}

  async execute(): Promise<IGetRolesRes> {
    const roles = await this._rolesService.getAll();

    return { roles };
  }
}
