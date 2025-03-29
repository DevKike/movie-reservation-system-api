import {
  IAuth,
  ISaveAuth,
  IAuthCredentials,
} from '../entity/auth.entity.interface';

export interface IAuthService {
  getByEmail(email: IAuth['email']): Promise<IAuth | null>;
  save(data: ISaveAuth): Promise<IAuth>;
  validateUser(credentials: IAuthCredentials): Promise<IAuth>;
}
