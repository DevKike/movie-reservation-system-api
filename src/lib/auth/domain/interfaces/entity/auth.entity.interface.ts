import { IRole } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';
import {
  ISaveUser,
  IUser,
} from 'src/lib/users/domain/interfaces/entity/users.entity.interface';

export interface IAuth {
  id: number;
  email: string;
  password: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  lastSignInAt: Date;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

export interface ISaveAuth
  extends Omit<
    IAuth,
    | 'id'
    | 'refreshToken'
    | 'refreshTokenExpiresIn'
    | 'lastSignIn'
    | 'createdAt'
    | 'updatedAt'
  > {}

export interface IUpdateAuth extends Partial<Omit<IAuth, 'user'>> {}

export interface IAuthCredentials extends Pick<IAuth, 'email' | 'password'> {}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ISignInRes {
  tokens: IAuthTokens;
  user: Pick<IUser, 'id' | 'name' | 'lastName'> & {
    email: string;
    roleId: IRole['id'];
  };
}

export interface ISignUp extends ISaveUser, IAuthCredentials {}

export interface ISignUpRes {
  auth: Omit<IAuth, 'password'>;
}
