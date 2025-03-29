import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ISaveUser } from '../../domain/interfaces/entity/users.entity.interface';

export class SaveUserDTO implements Omit<ISaveUser, 'role'> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsPhoneNumber('CO')
  phoneNumber: string;
}
