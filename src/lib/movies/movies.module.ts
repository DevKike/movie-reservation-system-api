import { Module } from '@nestjs/common';
import { MoviesController } from './infrastructure/controller/movies.controller';
import { MoviesService } from './infrastructure/service/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './infrastructure/entity/movies.entity';
import { CONSTANT } from 'src/common/constants/constant';
import { IMoviesService } from './domain/interfaces/service/movies.service.interface';
import { AddMovieUseCase } from './application/add-movie.use-case';
import { IUsersService } from '../users/domain/interfaces/service/users.service.interface';
import { IUploadsService } from '../common/domain/providers/interfaces/uploads/uploads.service.interface';
import { UsersModule } from '../users/users.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), UsersModule, SharedModule],
  controllers: [MoviesController],
  providers: [
    {
      provide: CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE,
      useClass: MoviesService,
    },
    {
      provide: CONSTANT.USE_CASES.MOVIE.ADD_MOVIE,
      useFactory: (
        moviesService: IMoviesService,
        usersService: IUsersService,
        uploadsService: IUploadsService,
      ) => new AddMovieUseCase(moviesService, usersService, uploadsService),
      inject: [
        CONSTANT.PROVIDERS.AUTH.AUTH_SERVICE,
        CONSTANT.PROVIDERS.USER.USERS_SERVICE,
        CONSTANT.PROVIDERS.UPLOAD.UPLOADS_SERVICE,
      ],
    },
  ],
})
export class MoviesModule {}
