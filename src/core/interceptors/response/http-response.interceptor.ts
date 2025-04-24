import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response as ExpressResponse } from 'express';
import { ResponseFormat } from './interface/response-format.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<ExpressResponse>();
    const statusCode = response.statusCode;
    const path = request.url;

    return next.handle().pipe(
      map((data: T) => ({
        statusCode,
        message: this.getSuccessMessageByStatusCode(statusCode),
        data,
        timestamp: new Date().toISOString(),
        path,
      })),
    );
  }

  private getSuccessMessageByStatusCode(statusCode: number): string {
    switch (statusCode) {
      case 200:
        return 'Operation completed successfully';
      case 201:
        return 'Resource created successfully';
      case 204:
        return 'Resource deleted successfully';
      default:
        return 'Success';
    }
  }
}
