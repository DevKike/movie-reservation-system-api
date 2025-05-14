import { SetMetadata } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';

export const Public = () => SetMetadata(CONSTANT.KEYS.IS_PUBLIC, true);
