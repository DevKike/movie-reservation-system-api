import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { SeederModule } from './seeds/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: (
        dbConfig: ConfigType<typeof databaseConfig>,
      ): TypeOrmModuleOptions =>
        ({
          ...dbConfig,
          type: dbConfig.type as TypeOrmModuleOptions['type'],
          timezone: 'Z',
        }) as TypeOrmModuleOptions,
    }),
    SeederModule,
  ],
})
export class DatabaseModule {}
