import { Module } from '@nestjs/common';
import { MoviesController } from './infrastructure/controller/movies.controller';
import { MoviesService } from './infrastructure/service/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './infrastructure/entity/movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
