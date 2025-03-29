import { IRole } from '../domain/interfaces/entity/roles.entity.interface';
import { IRolesService } from '../domain/interfaces/service/roles.service.interface';
import { IRolesUseCase } from '../domain/interfaces/use-case/roles.use-case.interface';

export class GetAllRolesUseCase implements IRolesUseCase<IRole[]> {
  constructor(private readonly _rolesService: IRolesService) {}

  async execute(): Promise<IRole[]> {
    return await this._rolesService.getAll();
  }
}
