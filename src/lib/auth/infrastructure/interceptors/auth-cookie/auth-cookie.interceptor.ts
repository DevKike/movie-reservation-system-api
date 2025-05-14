import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, from, switchMap } from 'rxjs';
import { CONSTANT } from 'src/common/constants/constant';
import { getPathBase } from '../../helpers/get-path-base.helper';
import { CookieManagerProvider } from '../../providers/cookie-manager.provider';
import { IJwtProvider } from 'src/lib/common/domain/providers/interfaces/jwt/jwt.provider.interface';
import { ISignInRes } from 'src/lib/auth/domain/interfaces/entity/auth.entity.interface';
import { Response } from 'express';
import { IRequest } from 'src/lib/common/domain/request/interface/request.interface';

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
          const request = context.switchToHttp().getRequest<IRequest>();
          const response = context.switchToHttp().getResponse<Response>();

          return from(
            this._jwtProvider.verifyToken(data.tokens.refreshToken),
          ).pipe(
            switchMap((decodedToken) => {
              const expiresIn = decodedToken.exp! * 1000 - Date.now();

              this._cookieManager.setAuthCookie(
                response,
                getPathBase(request.path),
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
                      path: `${getPathBase(request.path)}/refresh`,
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
