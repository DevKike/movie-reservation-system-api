import { IBaseJwtPayload } from './jwt-payload.interface';

export interface IJwtProvider {
  signAccessToken<T extends IBaseJwtPayload>(
    payload: T,
    expiresIn?: string,
  ): Promise<string>;
  verifyAccessToken<T extends IBaseJwtPayload>(token: string): Promise<T>;
  signRefreshToken<T extends IBaseJwtPayload>(
    payload: T,
    expiresIn?: string,
  ): Promise<string>;
  verifyRefreshToken<T extends IBaseJwtPayload>(token: string): Promise<T>;
}
