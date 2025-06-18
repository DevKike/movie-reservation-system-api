import { Module } from '@nestjs/common';
import { MoviesController } from './infrastructure/controller/movies.controller';
import { MoviesService } from './infrastructure/service/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './infrastructure/entity/movies.entity';
import { CONSTANT } from 'src/common/constants/constant';
import { IMoviesService } from './domain/interfaces/service/movies.service.interface';
import { AddMovieUseCase } from './application/add-movie.use-case';
import { IUsersService } from '../users/domain/interfaces/service/users.service.interface';
import { IUploadsService } from '../common/domain/interfaces/providers/uploads/uploads.service.interface';
import { UsersModule } from '../users/users.module';
import { SharedModule } from 'src/shared/shared.module';
import { UpdateMovieUseCase } from './application/update-movie.use-case';
import { GetAllMoviesUseCase } from './application/get-all-movies.use-case';
import { GetMovieByIdUseCase } from './application/get-movie-by-id.use-case';
import { DeleteMovieUseCase } from './application/delete-movie.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), UsersModule, SharedModule],
  controllers: [MoviesController],
  providers: [
    {
      provide: CONSTANT.PROVIDERS.MOVIE.SERVICE,
      useClass: MoviesService,
    },
    {
      provide: CONSTANT.USE_CASES.MOVIE.GET_ALL,
      useFactory: (moviesService: IMoviesService) =>
        new GetAllMoviesUseCase(moviesService),
      inject: [CONSTANT.PROVIDERS.MOVIE.SERVICE],
    },
    {
      provide: CONSTANT.USE_CASES.MOVIE.GET_BY_ID,
      useFactory: (moviesService: IMoviesService) =>
        new GetMovieByIdUseCase(moviesService),
      inject: [CONSTANT.PROVIDERS.MOVIE.SERVICE],
    },
    {
      provide: CONSTANT.USE_CASES.MOVIE.ADD,
      useFactory: (
        moviesService: IMoviesService,
        usersService: IUsersService,
        uploadsService: IUploadsService,
      ) => new AddMovieUseCase(moviesService, usersService, uploadsService),
      inject: [
        CONSTANT.PROVIDERS.MOVIE.SERVICE,
        CONSTANT.PROVIDERS.USER.USERS_SERVICE,
        CONSTANT.PROVIDERS.UPLOAD.UPLOADS_SERVICE,
      ],
    },
    {
      provide: CONSTANT.USE_CASES.MOVIE.UPDATE,
      useFactory: (
        usersService: IUsersService,
        moviesService: IMoviesService,
      ) => new UpdateMovieUseCase(usersService, moviesService),
      inject: [
        CONSTANT.PROVIDERS.USER.USERS_SERVICE,
        CONSTANT.PROVIDERS.MOVIE.SERVICE,
      ],
    },
    {
      provide: CONSTANT.USE_CASES.MOVIE.DELETE,
      useFactory: (moviesService: IMoviesService) =>
        new DeleteMovieUseCase(moviesService),
      inject: [CONSTANT.PROVIDERS.MOVIE.SERVICE],
    },
  ],
})
export class MoviesModule {}
