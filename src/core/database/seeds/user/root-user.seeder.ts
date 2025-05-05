import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SEED_MESSAGES } from 'src/common/constants/seed-messages.constant';
import { User } from 'src/lib/users/infrastructure/entity/users.entity';
import { Auth } from 'src/lib/auth/infrastructure/entity/auth.entity';
import { ROLE } from 'src/lib/roles/domain/enums/roles.enum';
import { Role } from 'src/lib/roles/infrastructure/entity/roles.entity';
import { HashProvider } from 'src/shared/providers/hash/hash.provider';
import { CONSTANT } from 'src/common/constants/constant';
import rootUserConfig from './config/root-user.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UserSeeder implements OnModuleInit {
  private readonly _userLogger = new Logger(UserSeeder.name);

  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
    @InjectRepository(Auth) private _authRepository: Repository<Auth>,
    @InjectRepository(Role) private _roleRepository: Repository<Role>,
    @Inject(CONSTANT.PROVIDERS.AUTH.HASH_PROVIDER)
    private readonly _hashProvider: HashProvider,
    @Inject(rootUserConfig.KEY)
    private readonly _rootUserConfig: ConfigType<typeof rootUserConfig>,
  ) {}

  async onModuleInit() {
    try {
      const existingRootUser = await this._authRepository.findOne({
        where: { email: this._rootUserConfig.email },
        relations: ['user'],
      });

      if (existingRootUser) {
        this._userLogger.log(SEED_MESSAGES.USER.ALREADY_COMPLETED);
        return;
      }

      const rootRole = await this._roleRepository.findOne({
        where: { name: ROLE.ROOT },
      });

      if (!rootRole) {
        this._userLogger.error(
          'Root role not found. Make sure role seeder has run.',
        );
        return;
      }

      const rootUser = await this._userRepository.save({
        name: this._rootUserConfig.name,
        lastName: this._rootUserConfig.lastName,
        phoneNumber: this._rootUserConfig.phoneNumber,
        role: rootRole,
      });

      const hashedPassword = await this._hashProvider.hash(
        this._rootUserConfig.password ?? 'password123',
      );

      await this._authRepository.save({
        email: this._rootUserConfig.email,
        password: hashedPassword,
        user: rootUser,
      });

      this._userLogger.log(SEED_MESSAGES.USER.COMPLETED);
    } catch (error) {
      this._userLogger.error(SEED_MESSAGES.USER.ERROR);
      if (error instanceof Error) {
        this._userLogger.error(error.message);
      } else {
        this._userLogger.error('An unknown error occurred');
      }
    }
  }
}
