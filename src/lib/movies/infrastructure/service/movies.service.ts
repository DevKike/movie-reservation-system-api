import { Injectable } from '@nestjs/common';
import { IMoviesService } from '../../domain/interfaces/service/movies.service.interface';
import { Repository } from 'typeorm';
import { Movie } from '../entity/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ISaveMovie,
  IMovie,
  IUpdateMovieData,
} from '../../domain/interfaces/entity/movies.entity.interface';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

@Injectable()
export class MoviesService implements IMoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly _movieRepository: Repository<Movie>,
  ) {}

  async getAll(): Promise<IMovie[]> {
    return await this._movieRepository.find();
  }

  async get(id: IMovie['id']): Promise<IMovie> {
    const movie = await this._movieRepository.findOne({ where: { id } });

    if (!movie) throw new NotFoundException('Movie was not found');

    return movie;
  }

  async save(movie: ISaveMovie): Promise<IMovie> {
    return await this._movieRepository.save(movie);
  }

  async update(id: IMovie['id'], data: IUpdateMovieData): Promise<IMovie> {
    const movie = await this.get(id);

    return await this._movieRepository.save({ ...movie, ...data });
  }

  async delete(id: IMovie['id']): Promise<void> {
    const movie = await this.get(id);

    await this._movieRepository.delete(movie.id);
  }
}
