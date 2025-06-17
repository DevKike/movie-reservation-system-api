import { Module } from '@nestjs/common';
import { HashProvider } from './providers/hash/hash.provider';
import { CONSTANT } from 'src/common/constants/constant';
import { JwtProvider } from './providers/jwt/jwt.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './providers/jwt/config/jwt.config';
import { UploadsService } from './providers/uploads/uploads.service';
import { S3Provider } from './providers/uploads/provider/s3.provider';
import uploadsConfig from './providers/uploads/config/uploads.config';
import { IUploadsProvider } from './providers/uploads/provider/interface/uploads.provider.interface';
import { MailerProvider } from './providers/mailer/provider/mailer.provider';
import { MailerService } from './providers/mailer/mailer.service';
import { IMailerProvider } from './providers/mailer/provider/interface/mailer.provider.interface';
import mailerConfig from './providers/mailer/config/mailer.config';

@Module({
  imports: [
    JwtModule,
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(uploadsConfig),
    ConfigModule.forFeature(mailerConfig),
  ],
  providers: [
    { provide: CONSTANT.PROVIDERS.AUTH.HASH_PROVIDER, useClass: HashProvider },
    { provide: CONSTANT.PROVIDERS.AUTH.JWT_PROVIDER, useClass: JwtProvider },
    {
      provide: CONSTANT.PROVIDERS.UPLOAD.UPLOADS_PROVIDER,
      useClass: S3Provider,
    },
    {
      provide: CONSTANT.PROVIDERS.UPLOAD.UPLOADS_SERVICE,
      useFactory: (s3Provider: IUploadsProvider) =>
        new UploadsService(s3Provider),
      inject: [CONSTANT.PROVIDERS.UPLOAD.UPLOADS_PROVIDER],
    },
    {
      provide: CONSTANT.PROVIDERS.MAILER.MAILER_PROVIDER,
      useClass: MailerProvider,
    },
    {
      provide: CONSTANT.PROVIDERS.MAILER.MAILER_SERVICE,
      useFactory: (mailerProvider: IMailerProvider) =>
        new MailerService(mailerProvider),
      inject: [CONSTANT.PROVIDERS.MAILER.MAILER_PROVIDER],
    },
  ],
  exports: [
    CONSTANT.PROVIDERS.AUTH.HASH_PROVIDER,
    CONSTANT.PROVIDERS.AUTH.JWT_PROVIDER,
    CONSTANT.PROVIDERS.UPLOAD.UPLOADS_SERVICE,
    CONSTANT.PROVIDERS.MAILER.MAILER_SERVICE,
  ],
})
export class SharedModule {}
