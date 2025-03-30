import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CONSTANT } from 'src/common/constants/constant';
import { ROLE } from 'src/lib/roles/domain/enums/roles.enum';
import { IRequest } from '../../interfaces/request/auth-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this._reflector.getAllAndOverride<ROLE[]>(
      CONSTANT.KEYS.ROLE,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request: IRequest = context.switchToHttp().getRequest();

    const user = request.user;

    return requiredRoles.some((role) => user.role.includes(role));
  }
}
