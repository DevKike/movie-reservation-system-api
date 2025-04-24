import { IRole } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';
import { UsersStatus } from '../../enums/users-status.enum';

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  phoneNumber?: string;
  status: UsersStatus;
  createdAt: Date;
  updatedAt: Date;
  role: IRole;
}

export interface ISaveUser
  extends Omit<IUser, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}

export interface IUpdateUser extends Partial<ISaveUser> {}
