import { PartialType } from '@nestjs/mapped-types';
import { SaveUserDTO } from './save-user.dto';

export class UpdateUserDTO extends PartialType(SaveUserDTO) {}
