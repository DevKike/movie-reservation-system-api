import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  Logger.log(
    `Server running on mode ${configService.get<string>('NODE_ENV')}`,
    'Bootstrap',
  );

  await app.listen(configService.get<number>('SERVER_PORT') || 3000);
}

void bootstrap();
