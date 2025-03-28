import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLES } from 'src/lib/roles/domain/enums/roles.enum';
import { IRoleCreate } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';
import { Role } from 'src/lib/roles/infrastructure/entity/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Role) private _roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const roles: IRoleCreate[] = [
      {
        name: ROLES.ADMIN,
      },
      {
        name: ROLES.USER,
      },
    ];

    const existingRoles = await this._roleRepository.find();

    if (existingRoles.length === 0) {
      await this._roleRepository.save(roles);
    }
  }
}
