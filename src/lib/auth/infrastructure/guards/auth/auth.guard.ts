import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { CONSTANT } from 'src/common/constants/constant';
import { UnauthorizedException } from 'src/common/exceptions/unauthorized.exception';
import { JwtProvider } from 'src/shared/providers/jwt/jwt.provider';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CONSTANT.PROVIDERS.AUTH.JWT_PROVIDER)
    private readonly _jwtProvider: JwtProvider,
    private readonly _reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(
      CONSTANT.KEYS.IS_PUBLIC,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const decodedToken = await this._jwtProvider.verifyToken(token);

      request[CONSTANT.KEYS.USER] = decodedToken;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException('Authentication token has expired');

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
