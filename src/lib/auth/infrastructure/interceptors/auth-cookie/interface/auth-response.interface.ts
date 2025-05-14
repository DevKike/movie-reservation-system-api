import { IAuthTokens } from 'src/lib/auth/domain/interfaces/entity/auth.entity.interface';

interface RefreshTokenMetadata {
  stored: string;
  cookieName: string;
  path: string;
}

export interface HttpAuthTokens extends Omit<IAuthTokens, 'refreshToken'> {
  accessToken: string;
  refreshToken: RefreshTokenMetadata;
}

export interface AuthResponse {
  tokens?: HttpAuthTokens;
  [key: string]: any;
}
