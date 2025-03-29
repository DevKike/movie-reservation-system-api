import { Injectable } from '@nestjs/common';
import { IUsersService } from '../../domain/interfaces/service/users.service.interface';
import {
  IUser,
  ISaveUser,
  IUpdateUser,
} from '../../domain/interfaces/entity/users.entity.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/users.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from 'src/lib/common/domain/exceptions/not-found.exception';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<IUser[]> {
    const users = await this._usersRepository.find();

    if (!users.length) throw new NotFoundException('No users found');

    return users;
  }

  async get(id: IUser['id']): Promise<IUser> {
    const user = await this._usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async save(user: ISaveUser): Promise<IUser> {
    return await this._usersRepository.save(user);
  }

  async update(id: IUser['id'], user: IUpdateUser): Promise<IUser> {
    await this.get(id);

    await this._usersRepository.update(id, user);

    return await this.get(id);
  }
}
