import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IBaseJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';
import { IJwtProvider } from 'src/lib/common/domain/providers/interfaces/jwt/jwt.provider.interface';

@Injectable()
export class JwtProvider implements IJwtProvider {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async signAccessToken<T extends IBaseJwtPayload>(
    payload: T,
    expiresIn?: string,
  ): Promise<string> {
    const enhancedPayload = {
      ...payload,
      aud: this._configService.get<string>('JWT_AUDIENCE', 'my-api'),
      iss: this._configService.get<string>('JWT_ISSUER', 'auth-service'),
    };

    return this._jwtService.signAsync(enhancedPayload, {
      expiresIn: expiresIn || this._configService.get<string>('JWT_EXPIRES_IN'),
      secret: this._configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async verifyAccessToken<T extends IBaseJwtPayload>(
    token: string,
  ): Promise<T> {
    return this._jwtService.verifyAsync<T>(token, {
      secret: this._configService.get<string>('JWT_SECRET_KEY'),
      audience: this._configService.get<string>('JWT_AUDIENCE', 'my-api'),
      issuer: this._configService.get<string>('JWT_ISSUER', 'auth-service'),
    });
  }
}
