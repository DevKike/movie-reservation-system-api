import { IAuth } from 'src/lib/auth/domain/interfaces/entity/auth.entity.interface';
import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';

export interface IRootUserConfig
  extends Pick<IAuth, 'email' | 'password'>,
    Pick<IUser, 'name' | 'lastName' | 'phoneNumber'> {}
