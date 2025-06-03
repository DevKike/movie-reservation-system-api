import { IAuth } from 'src/lib/auth/domain/interfaces/entity/auth.entity.interface';
import { IRole } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';
import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';

export interface IBaseJwtPayload {
  sub: IAuth['id'];
  iat?: number;
  exp?: number;
  aud?: string | string[];
  iss?: string;
}

export interface IJwtPayload extends IBaseJwtPayload {
  email: string;
  roleId: IRole['id'];
  userId: IUser['id'];
}
