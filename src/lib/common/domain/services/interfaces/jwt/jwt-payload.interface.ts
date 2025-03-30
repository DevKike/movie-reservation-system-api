import { ROLE } from 'src/lib/roles/domain/enums/roles.enum';

export interface IJwtPayload {
  id: number;
  email: string;
  role: ROLE;
  iat?: number;
  exp?: number;
}
