import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';

export interface IAuth {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
