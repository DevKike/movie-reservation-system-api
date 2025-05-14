import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';
import {
  ISaveMovie,
  IShowtime,
} from '../../domain/interfaces/entity/movies.entity.interface';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMovieDTO implements ISaveMovie {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  showtimes: IShowtime[];

  @Exclude()
  posterUrl: string;

  @Exclude()
  createdBy: IUser;
}
