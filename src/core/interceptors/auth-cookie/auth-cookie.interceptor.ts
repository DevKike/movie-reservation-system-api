import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import {
  AuthResponse,
  HttpAuthTokens,
} from './interface/auth-response.interface';
import { IBaseJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';

@Injectable()
export class AuthCookieInterceptor
  implements NestInterceptor<unknown, AuthResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<AuthResponse> {
    return next.handle().pipe(
      map((data: AuthResponse) => {
        if (
          data?.tokens?.refreshToken &&
          typeof data.tokens.refreshToken === 'string'
        ) {
          const request = context.switchToHttp().getRequest<Request>();
          const response = context.switchToHttp().getResponse<Response>();

          const pathBase = this.getPathBase(request.path);

          const refreshTokenStr = data.tokens.refreshToken;
          const expiresIn = this.getExpirationFromToken(refreshTokenStr);

          response.cookie('refreshToken', refreshTokenStr, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: expiresIn,
            path: `${pathBase}/refresh`,
          });

          return {
            ...data,
            tokens: {
              accessToken: data.tokens.accessToken,
              refreshToken: {
                stored: 'cookie',
                cookieName: 'refreshToken',
                path: `${pathBase}/refresh`,
              },
            } as HttpAuthTokens,
          };
        }
        return data;
      }),
    );
  }

  private getPathBase(currentPath: string): string {
    const segments = currentPath.split('/').filter(Boolean);

    if (segments.length > 1) {
      return '/' + segments.slice(0, -1).join('/');
    }

    return segments.length > 0 ? `/${segments[0]}` : '';
  }

  private getExpirationFromToken(token: string): number {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString(),
      ) as IBaseJwtPayload;

      return payload.exp! * 1000 - Date.now();
    } catch (_) {
      return 0;
    }
  }
}
