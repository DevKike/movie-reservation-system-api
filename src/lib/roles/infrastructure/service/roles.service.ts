import { Injectable } from '@nestjs/common';
import { IRolesService } from '../../domain/interfaces/service/roles.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entity/roles.entity';
import { Repository } from 'typeorm';
import { IRole } from '../../domain/interfaces/entity/roles.entity.interface';
import { NotFoundException } from 'src/lib/common/domain/exceptions/not-found.exception';
import { ROLES } from '../../domain/enums/roles.enum';

@Injectable()
export class RolesService implements IRolesService {
  constructor(
    @InjectRepository(Role) private readonly _roleRepository: Repository<Role>,
  ) {}

  async getAll(): Promise<IRole[]> {
    const roles = await this._roleRepository.find();

    if (roles.length === 0) throw new NotFoundException('Roles were not found');

    return roles;
  }

  async get(name: ROLES): Promise<IRole> {
    const role = await this._roleRepository.findOne({ where: { name: name } });

    if (!role) throw new NotFoundException('Role was not found');

    return role;
  }
}
