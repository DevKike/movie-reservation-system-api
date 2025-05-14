import { Module } from '@nestjs/common';
import { MoviesController } from './infrastructure/controller/movies.controller';
import { MoviesService } from './infrastructure/service/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './infrastructure/entity/movies.entity';
import { CONSTANT } from 'src/common/constants/constant';
import { IMoviesService } from './domain/interfaces/service/movies.service.interface';
import { AddMovieUseCase } from './application/add-movie.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [
    {
      provide: CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE,
      useClass: MoviesService,
    },
    {
      provide: CONSTANT.USE_CASES.MOVIE.ADD_MOVIE,
      useFactory: (moviesService: IMoviesService) =>
        new AddMovieUseCase(moviesService),
      inject: [CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE],
    },
  ],
})
export class MoviesModule {}
