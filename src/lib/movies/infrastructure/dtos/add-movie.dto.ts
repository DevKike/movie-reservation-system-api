import {
  IAddMovieBody,
  IShowtime,
} from '../../domain/interfaces/entity/movies.entity.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMovieDTO implements IAddMovieBody {
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
}
