import { SaveUserDTO } from 'src/lib/users/infrastructure/dtos/save-user.dto';
import { ISignOn } from '../../domain/interfaces/entity/auth.entity.interface';
import { AuthCredentialsDTO } from './auth-credentials.dto';
import { IntersectionType } from '@nestjs/mapped-types';

export class SignOnDTO
  extends IntersectionType(SaveUserDTO, AuthCredentialsDTO)
  implements ISignOn {}
