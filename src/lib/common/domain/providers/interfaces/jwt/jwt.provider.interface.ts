import { TokenType } from 'src/common/types/token.type';
import { IBaseJwtPayload } from './jwt-payload.interface';

export interface IJwtProvider {
  signToken<T extends IBaseJwtPayload>(
    payload: T,
    type: TokenType,
    expiresIn?: string,
  ): Promise<string>;
  verifyToken<T extends IBaseJwtPayload>(token: string): Promise<T>;
}
