import { registerAs } from '@nestjs/config';
import { CONSTANT } from 'src/common/constants/constant';
import { IJwtConfig } from './interface/jwt.config.interface';

export default registerAs(
  CONSTANT.KEYS.CONFIG.JWT,
  (): IJwtConfig => ({
    secretKey: process.env.JWT_SECRET_KEY!,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  }),
);
