import { Injectable } from '@nestjs/common';
import { IAuthService } from '../../domain/interfaces/service/auth.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entity/auth.entity';
import { Repository } from 'typeorm';
import {
  IAuth,
  ISaveAuth,
  IAuthCredentials,
  IUpdateAuth,
} from '../../domain/interfaces/entity/auth.entity.interface';
import { NotFoundException } from 'src/lib/common/domain/exceptions/not-found.exception';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(Auth) private readonly _authRepository: Repository<Auth>,
  ) {}

  async getById(id: IAuth['id']): Promise<IAuth> {
    const auth = await this._authRepository.findOne({
      where: { id },
      relations: ['user', 'user.role'],
    });

    if (!auth) throw new NotFoundException('User not found');

    return auth;
  }

  async getByEmail(email: IAuth['email']): Promise<IAuth | null> {
    const auth = await this._authRepository.findOne({
      where: { email },
      relations: ['user', 'user.role'],
    });

    if (!auth) return null;

    return auth;
  }

  async save(data: ISaveAuth): Promise<IAuth> {
    return await this._authRepository.save(data);
  }

  async validateUser(credentials: IAuthCredentials): Promise<IAuth> {
    const auth = await this._authRepository.findOne({
      where: { email: credentials.email },
      relations: ['user', 'user.role'],
    });

    if (!auth) throw new NotFoundException('User not found');

    return auth;
  }

  async update(id: IAuth['id'], data: IUpdateAuth): Promise<IAuth> {
    const auth = await this.getById(id);

    const updatedAuth = await this._authRepository.update(auth.id, data);

    if (!updatedAuth) throw new NotFoundException('User not found');

    return await this.getById(auth.id);
  }
}
