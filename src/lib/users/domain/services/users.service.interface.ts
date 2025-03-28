import {
  IUser,
  IUserSave,
  IUserUpdate,
} from '../interfaces/entity/users.entity.interface';

export interface IUserService {
  getAll(): Promise<IUser[]>;
  get(id: IUser['id']): Promise<IUser>;
  save(user: IUserSave): Promise<IUser>;
  update(id: IUser['id'], user: IUserUpdate): Promise<IUser>;
}
