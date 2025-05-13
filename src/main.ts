import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { ResponseInterceptor } from './core/interceptors/response/http-response.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors();

  app.use(cookieParser());

  const configService = app.get(ConfigService);

  Logger.log(
    `Server running on mode ${configService.get<string>('NODE_ENV')}`,
    'Bootstrap',
  );

  await app.listen(configService.get<number>('SERVER_PORT') || 3000, () => {
    Logger.log(
      `Server running on http://localhost:${configService.get<number>('SERVER_PORT') || 3000}`,
      'NestApplication',
    );
  });
}

void bootstrap();
