/* import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import {
  IAuthTokens,
  ISignInRes,
} from '../domain/interfaces/entity/auth.entity.interface';
import { UnauthorizedException } from 'src/common/exceptions/unauthorized.exception';
import { IJwtProvider } from 'src/lib/common/domain/providers/interfaces/jwt/jwt.provider.interface';

export class RefreshAuthUseCase
  implements IUseCase<IAuthTokens['refreshToken'], ISignInRes>
{
  constructor(private readonly _jwtService: IJwtProvider) {}

  async execute(input: string): Promise<ISignInRes> {
    try {
      const payload = await this._jwtService.verifyToken(input);

      return '';
    } catch (_) {
      throw new UnauthorizedException();
    }
  }
}
 */
