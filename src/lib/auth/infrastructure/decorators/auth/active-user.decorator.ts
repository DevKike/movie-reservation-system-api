import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequest } from 'src/lib/auth/infrastructure/interfaces/request/auth-request.interface';
import { IJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof IJwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequest>();

    const user = request.user;

    return field ? user?.[field] : user;
  },
);
