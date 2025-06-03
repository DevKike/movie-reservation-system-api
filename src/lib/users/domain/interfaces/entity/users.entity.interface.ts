import { IRole } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';
import { UsersStatus } from '../../enums/users-status.enum';
import { IMovie } from 'src/lib/movies/domain/interfaces/entity/movies.entity.interface';

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  phoneNumber?: string;
  status: UsersStatus;
  createdAt: Date;
  updatedAt: Date;
  role: IRole;
  movies: IMovie[];
}

export interface ISaveUser
  extends Omit<IUser, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'movies'> {}

export interface IUpdateUser {
  userId: IUser['id'];
  userData: Omit<
    Partial<IUser>,
    'id' | 'status' | 'createdAt' | 'updatedAt' | 'movies'
  >;
}
