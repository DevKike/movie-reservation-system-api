import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserService } from '../../domain/services/users.service.interface';
import {
  IUser,
  IUserSave,
  IUserUpdate,
} from '../../domain/interfaces/entity/users.entity.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<IUser[]> {
    const users = await this._userRepository.find();

    if (!users.length) throw new NotFoundException('No users found');

    return users;
  }

  async get(id: IUser['id']): Promise<IUser> {
    const user = await this._userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async save(user: IUserSave): Promise<IUser> {
    return await this._userRepository.save(user);
  }

  async update(id: IUser['id'], user: IUserUpdate): Promise<IUser> {
    await this._userRepository.update(id, user);

    return await this.get(id);
  }
}
