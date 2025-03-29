import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ISaveUser } from '../../domain/interfaces/entity/users.entity.interface';
import { IRole } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';
import { Exclude } from 'class-transformer';

export class SaveUserDTO implements ISaveUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsPhoneNumber('CO')
  phoneNumber: string;

  @Exclude()
  role: IRole;
}
