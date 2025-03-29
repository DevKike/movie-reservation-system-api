import { IJwtPayload } from './jwt-payload.interface';

export interface IJwtService {
  signToken(payload: IJwtPayload): Promise<string>;
  verifyToken(token: string): Promise<IJwtPayload>;
}
