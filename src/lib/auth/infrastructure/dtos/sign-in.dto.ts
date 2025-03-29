import { SaveUserDTO } from 'src/lib/users/infrastructure/dtos/save-user.dto';
import { ISignIn } from '../../domain/interfaces/entity/auth.entity.interface';
import { AuthCredentialsDTO } from './auth-credentials.dto';
import { IntersectionType } from '@nestjs/mapped-types';

export class SignInDTO
  extends IntersectionType(SaveUserDTO, AuthCredentialsDTO)
  implements ISignIn {}
