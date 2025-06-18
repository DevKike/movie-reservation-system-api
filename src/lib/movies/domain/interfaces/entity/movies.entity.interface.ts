import { IUploadFile } from 'src/lib/common/domain/interfaces/providers/uploads/upload-file.interface';
import { IPaginationRes } from 'src/lib/common/domain/interfaces/query/pagination-query.interface';
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

export interface IGetAllMoviesRes extends Omit<IPaginationRes, 'skip'> {
  movies: IMovie[];
}

export interface ISaveMovie
  extends Omit<IMovie, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IAddMovieData
  extends Omit<ISaveMovie, 'createdBy' | 'posterUrl'> {
  userId: IUser['id'];
  posterImage: IUploadFile;
}

export interface IAddMovieBody
  extends Omit<ISaveMovie, 'createdBy' | 'posterUrl'> {}

export interface IAddMovieRes {
  movie: IMovie;
}

export interface IUpdateMovie
  extends Partial<
    Omit<IMovie, 'id' | 'posterUrl' | 'createdAt' | 'updatedAt' | 'createdBy'>
  > {}

export interface IUpdateMovieReq extends IUpdateMovie {
  userId: IUser['id'];
  movieId: IMovie['id'];
}

export interface IUpdateMovieRes {
  movie: IMovie;
}
