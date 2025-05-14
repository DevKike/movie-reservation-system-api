import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { environmentSchema } from './environments/environment.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: environmentSchema,
    }),
    DatabaseModule,
  ],
  exports: [DatabaseModule],
})
export class CoreModule {}
