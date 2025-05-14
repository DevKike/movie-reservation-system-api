import { Injectable } from '@nestjs/common';
import { IMoviesService } from '../../domain/interfaces/service/movies.service.interface';
import { Repository } from 'typeorm';
import { Movie } from '../entity/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ISaveMovie,
  IMovie,
} from '../../domain/interfaces/entity/movies.entity.interface';

@Injectable()
export class MoviesService implements IMoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly _movieRepository: Repository<Movie>,
  ) {}

  async save(movie: ISaveMovie): Promise<IMovie> {
    return await this._movieRepository.save(movie);
  }
}
