import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';

export interface IShowtime {
  dateTime: Date;
  isAvailable: boolean;
}

export interface IMovies {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  genre: string;
  showtimes: IShowtime[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: IUser;
}
