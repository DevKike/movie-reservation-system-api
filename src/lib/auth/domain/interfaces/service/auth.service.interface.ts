import {
  IAuth,
  ISaveAuth,
  IAuthCredentials,
} from '../entity/auth.entity.interface';

export interface IAuthService {
  save(data: ISaveAuth): Promise<IAuth>;
  validateUser(credentials: IAuthCredentials): Promise<IAuth>;
}
