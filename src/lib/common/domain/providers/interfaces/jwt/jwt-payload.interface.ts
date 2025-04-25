import { IAuth } from 'src/lib/auth/domain/interfaces/entity/auth.entity.interface';
import { IRole } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';

export interface IBaseJwtPayload {
  sub: IAuth['id'];
  iat?: number;
  exp?: number;
}

export interface IJwtPayload extends IBaseJwtPayload {
  email: string;
  roleId: IRole['id'];
}
