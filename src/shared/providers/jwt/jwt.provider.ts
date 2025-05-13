import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IBaseJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';
import { IJwtProvider } from 'src/lib/common/domain/providers/interfaces/jwt/jwt.provider.interface';
import jwtConfig from './config/jwt.config';
import { TokenType } from 'src/common/types/token.type';

@Injectable()
export class JwtProvider implements IJwtProvider {
  constructor(
    private readonly _jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly _jwtConfig: ConfigType<typeof jwtConfig>,
  ) {}

  async signToken<T extends IBaseJwtPayload>(
    payload: T,
    type: TokenType,
    expiresIn?: string,
  ): Promise<string> {
    const defaultExpiry =
      type === 'access'
        ? this._jwtConfig.accessExpiresIn
        : this._jwtConfig.refreshExpiresIn;

    return await this._jwtService.signAsync(payload, {
      secret: this._jwtConfig.secretKey,
      expiresIn: expiresIn || defaultExpiry,
      audience: this._jwtConfig.audience,
      issuer: this._jwtConfig.issuer,
    });
  }

  async verifyToken<T extends IBaseJwtPayload>(token: string): Promise<T> {
    return await this._jwtService.verifyAsync(token, {
      secret: this._jwtConfig.secretKey,
      audience: this._jwtConfig.audience,
      issuer: this._jwtConfig.issuer,
    });
  }
}
