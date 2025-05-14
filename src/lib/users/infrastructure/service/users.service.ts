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
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

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
    const user = await this._usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        role: true,
      },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async getByPhoneNumber(phoneNumber: string): Promise<IUser | null> {
    return await this._usersRepository.findOneBy({ phoneNumber });
  }

  async save(user: ISaveUser): Promise<IUser> {
    return await this._usersRepository.save(user);
  }

  async update(
    userId: IUpdateUser['userId'],
    userData: IUpdateUser['userData'],
  ): Promise<IUser> {
    await this.get(userId);

    await this._usersRepository.update(userId, userData);

    return await this.get(userId);
  }
}
