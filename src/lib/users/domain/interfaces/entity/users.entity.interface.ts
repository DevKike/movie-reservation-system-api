import { UserStatus } from '../../enums/user-status.enum';

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate
  extends Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IUserUpdate
  extends Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {}
