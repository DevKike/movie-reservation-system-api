import { Module } from '@nestjs/common';
import { HashService } from './services/hash/hash.service';
import { CONSTANT } from 'src/common/constants/constant';

@Module({
  providers: [
    {
      provide: CONSTANT.PROVIDERS.HASH_SERVICE,
      useClass: HashService,
    },
  ],
  exports: [CONSTANT.PROVIDERS.HASH_SERVICE],
})
export class SharedModule {}
