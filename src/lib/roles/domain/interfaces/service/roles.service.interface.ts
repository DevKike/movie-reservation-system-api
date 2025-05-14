import { ROLE } from '../../enums/roles.enum';
import { IRole } from '../entity/roles.entity.interface';

export interface IRolesService {
  getAll(): Promise<IRole[]>;
  get(name: ROLE): Promise<IRole>;
}
