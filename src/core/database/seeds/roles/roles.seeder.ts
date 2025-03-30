import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SEED_MESSAGES } from 'src/common/constants/seed-messages.constant';
import { ROLES } from 'src/lib/roles/domain/enums/roles.enum';
import { IRoleCreate } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';
import { Role } from 'src/lib/roles/infrastructure/entity/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeeder implements OnModuleInit {
  private readonly _roleLogger = new Logger(RoleSeeder.name);

  constructor(
    @InjectRepository(Role) private _roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    try {
      const roles: IRoleCreate[] = [
        { name: ROLES.ROOT },
        { name: ROLES.ADMIN },
        { name: ROLES.USER },
      ];

      const existingRoles = await this._roleRepository.find();

      if (existingRoles.length > 0) {
        this._roleLogger.log(SEED_MESSAGES.ROLES.ALREADY_COMPLETED);
        return;
      }

      await this._roleRepository.save(roles);
      this._roleLogger.log(SEED_MESSAGES.ROLES.COMPLETED);
    } catch (error: unknown) {
      this._roleLogger.error(SEED_MESSAGES.ROLES.ERROR);
      if (error instanceof Error) {
        this._roleLogger.error(error.message);
      } else {
        this._roleLogger.error('An unknown error occurred');
      }
    }
  }
}
