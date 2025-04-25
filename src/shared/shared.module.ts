import { Module } from '@nestjs/common';
import { HashProvider } from './providers/hash/hash.provider';
import { CONSTANT } from 'src/common/constants/constant';
import { JwtProvider } from './providers/jwt/jwt.provider';
import { JwtModule } from '@nestjs/jwt';

const providers = [
  { provide: CONSTANT.PROVIDERS.AUTH.HASH_PROVIDER, useClass: HashProvider },
  { provide: CONSTANT.PROVIDERS.AUTH.JWT_PROVIDER, useClass: JwtProvider },
];

@Module({
  imports: [JwtModule],
  providers: [...providers],
  exports: [...providers.map((provide) => provide.provide)],
})
export class SharedModule {}
