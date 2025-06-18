import { IUseCase } from 'src/lib/common/domain/interfaces/use-case/use-case.interface';
import {
  IAuthTokens,
  ISignOutRes,
} from '../domain/interfaces/entity/auth.entity.interface';
import { IJwtProvider } from 'src/lib/common/domain/interfaces/providers/jwt/jwt.provider.interface';
import { IAuthService } from '../domain/interfaces/service/auth.service.interface';
import { UnauthorizedException } from 'src/common/exceptions/unauthorized.exception';

export class SignOutUseCase
  implements IUseCase<IAuthTokens['refreshToken'], ISignOutRes>
{
  constructor(
    private readonly _jwtProvider: IJwtProvider,
    private readonly _authService: IAuthService,
  ) {}

  async execute(input: string): Promise<ISignOutRes> {
    const decodedToken = await this._jwtProvider.verifyToken(input);

    if (!decodedToken.sub) throw new UnauthorizedException();

    await this._authService.update(decodedToken.sub, {
      refreshToken: null,
      refreshTokenExpiresAt: null,
    });

    return { message: 'Signed out successfully' };
  }
}
