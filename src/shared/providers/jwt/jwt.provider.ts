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

  async signToken<T extends IBaseJwtPayload>(payload: T): Promise<string> {
    return await this._jwtService.signAsync(payload, {
      secret: this._configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this._configService.get<string>('JWT_EXPIRES_IN'),
    });
  }

  async verifyToken<T extends IBaseJwtPayload>(token: string): Promise<T> {
    return await this._jwtService.verifyAsync(token, {
      secret: this._configService.get<string>('JWT_SECRET_KEY'),
    });
  }
}
