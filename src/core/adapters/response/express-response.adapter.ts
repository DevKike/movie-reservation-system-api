import { Response } from 'express';
import { IResponseAdapter } from './interface/response-adapter.interface';
import { CookieOptions } from 'src/core/interceptors/auth-cookie/interface/cookie-options.interface';

export class ExpressResponseAdapter implements IResponseAdapter {
  constructor(private readonly expressResponse: Response) {}

  cookie(name: string, value: string, options?: CookieOptions): void {
    if (options) {
      this.expressResponse.cookie(name, value, options);
    } else {
      this.expressResponse.cookie(name, value);
    }
  }

  clearCookie(
    name: string,
    options?: Pick<CookieOptions, 'path' | 'domain'>,
  ): void {
    this.expressResponse.clearCookie(name, options);
  }

  getUnderlying(): Response {
    return this.expressResponse;
  }
}
