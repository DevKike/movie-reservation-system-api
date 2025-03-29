import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/lib/common/domain/services/interfaces/jwt/jwt-payload.interface';
import { IJwtService } from 'src/lib/common/domain/services/interfaces/jwt/jwt.service.interface';

@Injectable()
export class JwtProvider implements IJwtService {
  constructor(private readonly _jwtService: JwtService) {}

  async signToken(payload: IJwtPayload): Promise<string> {
    return await this._jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<IJwtPayload> {
    return await this._jwtService.verifyAsync(token);
  }
}
