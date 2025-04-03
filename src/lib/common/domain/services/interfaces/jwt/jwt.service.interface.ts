import { IBaseJwtPayload } from './jwt-payload.interface';

export interface IJwtService {
  signToken<T extends IBaseJwtPayload>(
    payload: T,
    expiresIn?: string,
  ): Promise<string>;
  verifyToken<T extends IBaseJwtPayload>(token: string): Promise<T>;
}
