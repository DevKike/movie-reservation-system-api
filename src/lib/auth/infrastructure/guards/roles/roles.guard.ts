import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CONSTANT } from 'src/common/constants/constant';
import { ROLE } from 'src/lib/roles/domain/enums/roles.enum';
import { Request } from 'express';
import { RequestAdapterFactory } from 'src/core/adapters/request/factory/request-adapter.factory';
import { IJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly roleIdToName: Record<number, ROLE> = {
    [CONSTANT.ROLE_IDS.ROOT]: ROLE.ROOT,
    [CONSTANT.ROLE_IDS.ADMIN]: ROLE.ADMIN,
    [CONSTANT.ROLE_IDS.USER]: ROLE.USER,
  };

  constructor(private readonly _reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this._reflector.getAllAndOverride<ROLE[]>(
      CONSTANT.KEYS.ROLE,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const requestAdapter =
      RequestAdapterFactory.createFromExpressRequest(request);

    const user = requestAdapter.user as IJwtPayload;

    if (!user || user.roleId === undefined) return false;

    const userRoleName = this.roleIdToName[user.roleId];

    if (!userRoleName) return false;

    return requiredRoles.includes(userRoleName);
  }
}
