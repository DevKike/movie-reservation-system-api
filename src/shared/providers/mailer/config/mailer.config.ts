import { registerAs } from '@nestjs/config';
import { CONSTANT } from 'src/common/constants/constant';
import { IMailerConfig } from './interface/mailer.config.interface';

export default registerAs(
  CONSTANT.KEYS.CONFIG.MAILER,
  (): IMailerConfig => ({
    host: process.env.MAIL_HOST!,
    port: Number(process.env.MAIL_PORT!),
    isSecure: !process.env.MAIL_IS_SECURE,
    credentials: {
      user: process.env.MAIL_USER!,
      password: process.env.MAIL_PASSWORD!,
    },
    fromName: process.env.MAIL_FROM_NAME!,
    fromAddress: process.env.MAIL_FROM_ADDRESS!,
  }),
);
