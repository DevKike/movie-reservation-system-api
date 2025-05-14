import { Injectable } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { CookieOptions, Response } from 'express';

@Injectable()
export class CookieManagerProvider {
  setAuthCookie(
    res: Response,
    currentPath: string,
    token: string,
    expiresIn: number,
  ): void {
    const options: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      maxAge: expiresIn,
      path: currentPath,
    };

    res.cookie(CONSTANT.KEYS.REFRESH_TOKEN, token, options);
  }

  clearAuthCookie(res: Response, currentPath: string): void {
    res.clearCookie(CONSTANT.KEYS.REFRESH_TOKEN, {
      path: currentPath,
    });
  }
}
