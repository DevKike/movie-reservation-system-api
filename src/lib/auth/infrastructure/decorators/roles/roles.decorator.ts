import { SetMetadata } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { ROLE } from 'src/lib/roles/domain/enums/roles.enum';

export const Roles = (...roles: ROLE[]) =>
  SetMetadata(CONSTANT.KEYS.ROLE, roles);
