import { Injectable } from '@nestjs/common';
import { IMoviesService } from '../../domain/interfaces/service/movies.service.interface';
import { Repository } from 'typeorm';
import { Movie } from '../entity/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ISaveMovie,
  IMovie,
  IUpdateMovie,
  IGetAllMoviesRes,
} from '../../domain/interfaces/entity/movies.entity.interface';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { IPaginationQuery } from 'src/lib/common/domain/interfaces/query/pagination-query.interface';
import { calculatePaginationOffset } from 'src/lib/common/domain/helpers/calculate-pagination-offset.helper';

@Injectable()
export class MoviesService implements IMoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly _movieRepository: Repository<Movie>,
  ) {}

  async getAll(paginationQuery: IPaginationQuery): Promise<IGetAllMoviesRes> {
    const total = await this._movieRepository.count();

    const { skip, totalPages, page, limit } = calculatePaginationOffset(
      paginationQuery,
      total,
    );

    const movies = await this._movieRepository.find({
      take: limit,
      skip,
    });

    return {
      movies,
      page,
      limit,
      totalPages,
    };
  }

  async getById(id: IMovie['id']): Promise<IMovie> {
    const movie = await this._movieRepository.findOne({ where: { id } });

    if (!movie) throw new NotFoundException('Movie was not found');

    return movie;
  }

  async save(movie: ISaveMovie): Promise<IMovie> {
    return await this._movieRepository.save(movie);
  }

  async update(movie: IMovie, data: IUpdateMovie): Promise<IMovie> {
    return await this._movieRepository.save({ ...movie, ...data });
  }

  async delete(id: IMovie['id']): Promise<void> {
    const movie = await this.getById(id);

    await this._movieRepository.delete(movie.id);
  }
}
