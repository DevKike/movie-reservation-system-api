import { Injectable } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { CookieOptions, Response } from 'express';

@Injectable()
export class CookieManagerProvider {
  setAuthCookie(res: Response, token: string, expiresIn: number): void {
    const options: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: expiresIn,
      path: CONSTANT.KEYS.AUTH_PATH,
    };

    res.cookie(CONSTANT.KEYS.REFRESH_TOKEN, token, options);
  }

  clearAuthCookie(res: Response): void {
    res.clearCookie(CONSTANT.KEYS.REFRESH_TOKEN, {
      path: CONSTANT.KEYS.AUTH_PATH,
    });
  }
}
