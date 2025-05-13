import { CookieOptions } from '../../../interceptors/auth-cookie/interface/cookie-options.interface';

export interface IResponseAdapter {
  cookie(name: string, value: string, options?: CookieOptions): void;
  clearCookie?(
    name: string,
    options?: Pick<CookieOptions, 'path' | 'domain'>,
  ): void;
  getUnderlying?(): unknown;
}
