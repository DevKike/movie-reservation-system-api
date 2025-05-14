import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAuthCredentials } from '../../domain/interfaces/entity/auth.entity.interface';

export class AuthCredentialsDTO implements IAuthCredentials {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
