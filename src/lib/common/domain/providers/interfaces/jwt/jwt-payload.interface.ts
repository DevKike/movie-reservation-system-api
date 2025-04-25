import { ROLE } from 'src/lib/roles/domain/enums/roles.enum';

export interface IBaseJwtPayload {
  sub: number;
  iat?: number;
  exp?: number;
}

export interface IJwtPayload extends IBaseJwtPayload {
  email: string;
  role: ROLE;
}
