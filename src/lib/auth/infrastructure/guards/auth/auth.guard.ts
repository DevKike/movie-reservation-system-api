import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CONSTANT } from 'src/common/constants/constant';
import { UnauthorizedException } from 'src/lib/common/domain/exceptions/unauthorized.exception';
import { JwtProvider } from 'src/shared/services/jwt/jwt.service';
import { IS_PUBLIC_KEY } from '../../decorators/auth/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CONSTANT.PROVIDERS.JWT_SERVICE)
    private readonly _jwtService: JwtProvider,
    private readonly _reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const payload = await this._jwtService.verifyToken(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid authentication token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];

    if (!token) {
      throw new UnauthorizedException('Authorization header missing');
    }

    if (type !== 'Bearer') {
      throw new UnauthorizedException(
        'Invalid token type. Expected Bearer token',
      );
    }

    return token;
  }
}
