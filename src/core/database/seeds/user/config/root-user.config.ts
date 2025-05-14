import { registerAs } from '@nestjs/config';
import { CONSTANT } from 'src/common/constants/constant';
import { IRootUserConfig } from './interfaces/root-user.config.interface';

export default registerAs(
  CONSTANT.KEYS.CONFIG.ROOT_USER,
  (): IRootUserConfig => ({
    email: process.env.ROOT_USER_EMAIL!,
    password: process.env.ROOT_USER_PASSWORD!,
    name: process.env.ROOT_USER_NAME!,
    lastName: process.env.ROOT_USER_LASTNAME!,
    phoneNumber: process.env.ROOT_USER_PHONE,
  }),
);
