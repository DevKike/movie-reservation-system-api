import { Injectable } from '@nestjs/common';
import { IHashService } from 'src/lib/common/domain/services/interfaces/hash/hash.service.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashService implements IHashService {
  constructor(private readonly _configService: ConfigService) {}

  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      this._configService.get<number>('HASH_SALT_ROUNDS'),
    );
    return await bcrypt.hash(data, salt);
  }

  async compareHash(data: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(data, hashed);
  }
}
