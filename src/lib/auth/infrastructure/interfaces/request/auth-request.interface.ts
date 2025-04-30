import { IJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';

export interface IRequest {
  user: IJwtPayload;
}
