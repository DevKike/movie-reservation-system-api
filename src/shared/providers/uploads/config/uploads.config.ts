import { registerAs } from '@nestjs/config';
import { CONSTANT } from 'src/common/constants/constant';
import { IUploadsConfig } from './interface/uploads.config.interface';

export default registerAs(
  CONSTANT.KEYS.CONFIG.UPLOADS,
  (): IUploadsConfig => ({
    provider: 'aws',
    bucketName: process.env.AWS_PUBLIC_BUCKET_NAME!,
    region: process.env.AWS_REGION,
    baseUrl: process.env.AWS_CLOUDFRONT_URL,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }),
);
