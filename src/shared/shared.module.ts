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

@Module({
  imports: [
    JwtModule,
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(uploadsConfig),
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
  ],
  exports: [
    CONSTANT.PROVIDERS.AUTH.HASH_PROVIDER,
    CONSTANT.PROVIDERS.AUTH.JWT_PROVIDER,
    CONSTANT.PROVIDERS.UPLOAD.UPLOADS_SERVICE,
  ],
})
export class SharedModule {}
