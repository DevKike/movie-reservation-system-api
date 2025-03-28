import { IRole } from '../entity/roles.entity.interface';

export interface IRoleService {
  getAll(): Promise<IRole[]>;
}
