import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { CookieManagerProvider } from '../../providers/cookie-manager.provider';
import { Observable, tap } from 'rxjs';
import { IRequest } from 'src/lib/common/domain/request/interface/request.interface';
import { Response } from 'express';

@Injectable()
export class AuthCookieClearInterceptor implements NestInterceptor {
  constructor(private readonly _cookieManager: CookieManagerProvider) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest<IRequest>();
        const response = context.switchToHttp().getResponse<Response>();

        this._cookieManager.clearAuthCookie(response, request.path);
      }),
    );
  }
}
