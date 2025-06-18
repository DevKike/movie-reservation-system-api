import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, from, switchMap } from 'rxjs';
import { CONSTANT } from 'src/common/constants/constant';
import { CookieManagerProvider } from '../../providers/cookie-manager.provider';
import { IJwtProvider } from 'src/lib/common/domain/interfaces/providers/jwt/jwt.provider.interface';
import { ISignInRes } from 'src/lib/auth/domain/interfaces/entity/auth.entity.interface';
import { Response } from 'express';

@Injectable()
export class AuthCookieInterceptor implements NestInterceptor {
  constructor(
    private readonly _cookieManager: CookieManagerProvider,
    @Inject(CONSTANT.PROVIDERS.AUTH.JWT_PROVIDER)
    private readonly _jwtProvider: IJwtProvider,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      switchMap((data: ISignInRes) => {
        if (data?.tokens?.refreshToken) {
          const response = context.switchToHttp().getResponse<Response>();

          return from(
            this._jwtProvider.verifyToken(data.tokens.refreshToken),
          ).pipe(
            switchMap((decodedToken) => {
              const expiresIn = decodedToken.exp! * 1000 - Date.now();

              this._cookieManager.setAuthCookie(
                response,
                data.tokens.refreshToken,
                expiresIn,
              );

              return from([
                {
                  ...data,
                  tokens: {
                    accessToken: data.tokens.accessToken,
                    refreshToken: {
                      stored: 'cookie',
                      cookieName: CONSTANT.KEYS.REFRESH_TOKEN,
                    },
                  },
                },
              ]);
            }),
          );
        }

        return from([data]);
      }),
    );
  }
}
