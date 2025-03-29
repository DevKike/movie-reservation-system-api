import { ROLES } from 'src/lib/roles/domain/enums/roles.enum';

export interface IJwtPayload {
  id: number;
  email: string;
  role: ROLES;
  iat?: number;
  exp?: number;
}
