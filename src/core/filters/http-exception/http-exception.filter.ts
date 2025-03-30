import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException } from 'src/lib/common/domain/exceptions/custom.exception';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getResponse<Request>();

    switch (true) {
      case exception instanceof HttpException:
        return response.status(exception.getStatus()).json({
          statusCode: exception.getStatus(),
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });

      case exception instanceof CustomException:
        return response.status(exception.statusCode).json({
          statusCode: exception.statusCode,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });

      default:
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        });
    }
  }
}
