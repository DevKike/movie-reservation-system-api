import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IUserSave } from '../../domain/interfaces/entity/users.entity.interface';

export class UsersSaveDto implements IUserSave {
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
