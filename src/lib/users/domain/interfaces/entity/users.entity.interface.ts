import { UserStatus } from '../../enums/user-status.enum';

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  phoneNumber?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaveUser
  extends Omit<IUser, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}

export interface IUpdateUser extends Partial<ISaveUser> {}
