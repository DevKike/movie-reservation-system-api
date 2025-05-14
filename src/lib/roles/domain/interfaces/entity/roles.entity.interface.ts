import { ROLE } from '../../enums/roles.enum';

export interface IRole {
  id: number;
  name: ROLE;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoleCreate
  extends Omit<IRole, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IGetRolesRes {
  roles: IRole[];
}
