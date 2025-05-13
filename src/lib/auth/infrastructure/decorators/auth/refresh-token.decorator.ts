import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CONSTANT } from 'src/common/constants/constant';
import { RequestAdapterFactory } from 'src/core/adapters/request/factory/request-adapter.factory';

export const RefreshToken = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  const requestAdapter =
    RequestAdapterFactory.createFromExpressRequest(request);

  const token = requestAdapter.getCookie(CONSTANT.KEYS.REFRESH_TOKEN);

  if (!token) throw new UnauthorizedException('Refresh token not found');

  return token;
});
