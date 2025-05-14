import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';

export interface IShowtime {
  dateTime: Date;
  isAvailable: boolean;
}

export interface IMovie {
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

export interface ISaveMovie
  extends Pick<
    IMovie,
    'title' | 'description' | 'posterUrl' | 'genre' | 'showtimes' | 'createdBy'
  > {}
