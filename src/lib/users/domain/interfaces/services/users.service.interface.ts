import {
  IUser,
  ISaveUser,
  IUpdateUser,
} from '../entity/users.entity.interface';

export interface IUserService {
  getAll(): Promise<IUser[]>;
  get(id: IUser['id']): Promise<IUser>;
  save(user: ISaveUser): Promise<IUser>;
  update(id: IUser['id'], user: IUpdateUser): Promise<IUser>;
}
