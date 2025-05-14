import { Module } from '@nestjs/common';
import { MoviesController } from './infrastructure/controller/movies.controller';

@Module({
  controllers: [MoviesController]
})
export class MoviesModule {}
