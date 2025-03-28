import { IRole } from 'src/lib/roles/domain/interfaces/roles.entity.interface';
import { UserStatus } from '../../enums/user-status.enum';

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  phoneNumber?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  role: IRole;
}

export interface ISaveUser
  extends Omit<IUser, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'role'> {}

export interface IUpdateUser extends Partial<ISaveUser> {}
