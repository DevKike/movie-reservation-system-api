import { Injectable } from '@nestjs/common';
import { IRoleService } from '../../domain/interfaces/services/roles.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entity/roles.entity';
import { Repository } from 'typeorm';
import { IRole } from '../../domain/interfaces/entity/roles.entity.interface';
import { NotFoundException } from 'src/lib/common/domain/exceptions/not-found.exception';

@Injectable()
export class RolesService implements IRoleService {
  constructor(
    @InjectRepository(Role) private readonly _roleRepository: Repository<Role>,
  ) {}

  async getAll(): Promise<IRole[]> {
    const roles = await this._roleRepository.find();

    if (!roles.length) throw new NotFoundException('Roles were not found');

    return roles;
  }
}
