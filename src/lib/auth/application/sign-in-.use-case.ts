import { BadRequestException } from 'src/lib/common/domain/exceptions/bad-request.exception';
import {
  IAuthCredentials,
  ISignInRes,
} from '../domain/interfaces/entity/auth.entity.interface';
import { IAuthService } from '../domain/interfaces/service/auth.service.interface';
import { IAuthUseCase } from '../domain/interfaces/use-case/auth.use-case.interface';
import { IHashProvider } from 'src/lib/common/domain/providers/interfaces/hash/hash.provider.interface';
import { IJwtProvider } from 'src/lib/common/domain/providers/interfaces/jwt/jwt.provider.interface';
import { ConfigService } from '@nestjs/config';

export class SignInUseCase
  implements IAuthUseCase<ISignInRes, IAuthCredentials>
{
  constructor(
    private readonly _authService: IAuthService,
    private readonly _hashProvider: IHashProvider,
    private readonly _jwtProvider: IJwtProvider,
    private readonly _configService: ConfigService,
  ) {}

  async execute(input: IAuthCredentials): Promise<ISignInRes> {
    const auth = await this._authService.getByEmail(input.email);

    if (!auth) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await this._hashProvider.compareHash(
      input.password,
      auth.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const accessToken = await this._jwtProvider.signAccessToken({
      sub: auth.id,
      email: auth.email,
      roleId: auth.user.role.id,
    });

    const refreshToken = await this._jwtProvider.signRefreshToken({
      sub: auth.id,
    });

    const refreshTokenExpiresAt = this._configService.get<number>(
      JWT_REFRESH_EXPIRES_IN,
    );

    const updateRefreshToken = await this._authService.update(auth.id, {
      refreshToken,
      refreshTokenExpiresAt,
      lastSignIn,
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
  }
}
