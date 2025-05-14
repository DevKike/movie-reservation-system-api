import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';
import { IRequest } from 'src/lib/common/domain/request/interface/request.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof IJwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequest>();

    const user = request.user as IJwtPayload;

    return field ? user?.[field] : user;
  },
);
