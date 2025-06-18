import { IUseCase } from 'src/lib/common/domain/interfaces/use-case/use-case.interface';
import {
  IAuthTokens,
  ISignInRes,
} from '../domain/interfaces/entity/auth.entity.interface';
import { UnauthorizedException } from 'src/common/exceptions/unauthorized.exception';
import { IJwtProvider } from 'src/lib/common/domain/interfaces/providers/jwt/jwt.provider.interface';
import { IAuthService } from '../domain/interfaces/service/auth.service.interface';
import { IJwtPayload } from 'src/lib/common/domain/interfaces/providers/jwt/jwt-payload.interface';

export class RefreshAuthUseCase
  implements IUseCase<IAuthTokens['refreshToken'], ISignInRes>
{
  constructor(
    private readonly _jwtProvider: IJwtProvider,
    private readonly _authService: IAuthService,
  ) {}

  async execute(input: string): Promise<ISignInRes> {
    try {
      const decodedToken = await this._jwtProvider.verifyToken(input);

      const authId = decodedToken.sub;

      if (!authId) throw new UnauthorizedException('Invalid token payload');

      const auth = await this._authService.getById(authId);

      if (auth.refreshToken !== input)
        throw new UnauthorizedException('Token revoked or invalid');

      if (!auth) throw new UnauthorizedException('User not found');

      if (auth.refreshTokenExpiresAt && new Date() > auth.refreshTokenExpiresAt)
        throw new UnauthorizedException('Token has expired');

      const accessToken = await this._jwtProvider.signToken<IJwtPayload>(
        {
          sub: auth.id,
          email: auth.email,
          roleId: auth.user.role.id,
          userId: auth.user.id,
        },
        'access',
      );

      const refreshToken = await this._jwtProvider.signToken(
        {
          sub: auth.id,
        },
        'refresh',
      );

      const newDecodedToken = await this._jwtProvider.verifyToken(refreshToken);

      const refreshTokenExpirationDate = new Date(newDecodedToken.exp! * 1000);

      await this._authService.update(auth.id, {
        refreshToken,
        refreshTokenExpiresAt: refreshTokenExpirationDate,
      });

      return {
        tokens: { accessToken, refreshToken },
        user: {
          id: auth.user.id,
          name: auth.user.name,
          lastName: auth.user.lastName,
          email: auth.email,
          roleId: auth.user.role.id,
        },
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
