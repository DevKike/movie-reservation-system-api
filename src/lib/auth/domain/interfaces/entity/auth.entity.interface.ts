import {
  ISaveUser,
  IUser,
} from 'src/lib/users/domain/interfaces/entity/users.entity.interface';

export interface IAuth {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

export interface ISaveAuth
  extends Omit<IAuth, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IAuthCredentials extends Pick<IAuth, 'email' | 'password'> {}
export interface ISignInRes {
  token: string;
}

export interface ISignOn extends ISaveUser, IAuthCredentials {}
export interface ISignOnRes extends Omit<IAuth, 'password'> {}
