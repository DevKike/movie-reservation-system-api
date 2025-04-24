import { Module } from '@nestjs/common';
import { HashService } from './services/hash/hash.service';
import { CONSTANT } from 'src/common/constants/constant';
import { JwtProvider } from './services/jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';

const providers = [
  { provide: CONSTANT.PROVIDERS.AUTH.HASH_SERVICE, useClass: HashService },
  { provide: CONSTANT.PROVIDERS.AUTH.JWT_SERVICE, useClass: JwtProvider },
];

@Module({
  imports: [JwtModule],
  providers: [...providers],
  exports: [...providers.map((provide) => provide.provide)],
})
export class SharedModule {}
