import {
  IUser,
  ISaveUser,
  IUpdateUser,
} from '../entity/users.entity.interface';

export interface IUsersService {
  getAll(): Promise<IUser[]>;
  getById(id: IUser['id']): Promise<IUser>;
  getByPhoneNumber(phoneNumber: string): Promise<IUser | null>;
  save(user: ISaveUser): Promise<IUser>;
  update(
    userId: IUpdateUser['userId'],
    userData: IUpdateUser['userData'],
  ): Promise<IUser>;
}
