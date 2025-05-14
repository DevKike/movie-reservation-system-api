import {
  IAuth,
  ISaveAuth,
  IAuthCredentials,
  IUpdateAuth,
} from '../entity/auth.entity.interface';

export interface IAuthService {
  getById(id: IAuth['id']): Promise<IAuth>;
  getByEmail(email: IAuth['email']): Promise<IAuth | null>;
  save(data: ISaveAuth): Promise<IAuth>;
  validateUser(credentials: IAuthCredentials): Promise<IAuth>;
  update(id: IAuth['id'], data: IUpdateAuth): Promise<IAuth>;
}
