import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/lib/common/domain/services/interfaces/jwt/jwt-payload.interface';
import { IJwtService } from 'src/lib/common/domain/services/interfaces/jwt/jwt.service.interface';

@Injectable()
export class JwtProvider implements IJwtService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async signToken(payload: IJwtPayload): Promise<string> {
    return await this._jwtService.signAsync(payload, {
      secret: this._configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this._configService.get<string>('JWT_EXPIRES_IN'),
    });
  }

  async verifyToken(token: string): Promise<IJwtPayload> {
    return await this._jwtService.verifyAsync(token, {
      secret: this._configService.get<string>('JWT_SECRET_KEY'),
    });
  }
}
