import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { RequestAdapterFactory } from 'src/core/adapters/request/factory/request-adapter.factory';
import { IJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof IJwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const requestAdapter =
      RequestAdapterFactory.createFromExpressRequest(request);

    const user = requestAdapter.user as IJwtPayload;

    return field ? user?.[field] : user;
  },
);
