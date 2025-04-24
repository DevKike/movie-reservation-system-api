import {
  IUser,
  ISaveUser,
  IUpdateUser,
} from '../entity/users.entity.interface';

export interface IUsersService {
  getAll(): Promise<IUser[]>;
  get(id: IUser['id']): Promise<IUser>;
  getByPhoneNumber(phoneNumber: string): Promise<IUser | null>;
  save(user: ISaveUser): Promise<IUser>;
  update(id: IUser['id'], user: IUpdateUser): Promise<IUser>;
}
