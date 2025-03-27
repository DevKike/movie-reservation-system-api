import {
  IUser,
  IUserCreate,
  IUserUpdate,
} from '../interfaces/entity/users.entity.interface';

export interface IUserService {
  getAll(): Promise<IUser[]>;
  get(id: IUser['id']): Promise<IUser>;
  save(user: IUserCreate): Promise<IUser>;
  update(id: IUser['id'], user: IUserUpdate): Promise<IUser>;
}
