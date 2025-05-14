import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { IRequest } from 'src/lib/common/domain/request/interface/request.interface';

export const RefreshToken = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<IRequest>();

  const token = request.cookies?.[CONSTANT.KEYS.REFRESH_TOKEN] as string;

  if (!token) throw new UnauthorizedException('Refresh token not found');

  return token;
});
