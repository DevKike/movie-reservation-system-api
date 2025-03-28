import { ROLES } from '../../enums/roles.enum';

export interface IRole {
  id: number;
  name: ROLES;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoleCreate
  extends Omit<IRole, 'id' | 'createdAt' | 'updatedAt'> {}
