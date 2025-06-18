import { PartialType } from '@nestjs/mapped-types';
import { IUpdateMovie } from '../../domain/interfaces/entity/movies.entity.interface';
import { AddMovieDTO } from './add-movie.dto';

export class UpdateMovieDTO
  extends PartialType(AddMovieDTO)
  implements IUpdateMovie {}
