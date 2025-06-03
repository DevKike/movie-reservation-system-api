import { BadRequestException } from 'src/common/exceptions/bad-request.exception';
import {
  IAuthCredentials,
  ISignInRes,
} from '../domain/interfaces/entity/auth.entity.interface';
import { IAuthService } from '../domain/interfaces/service/auth.service.interface';
import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import { IHashProvider } from 'src/lib/common/domain/providers/interfaces/hash/hash.provider.interface';
import { IJwtProvider } from 'src/lib/common/domain/providers/interfaces/jwt/jwt.provider.interface';
import { IJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';

export class SignInUseCase implements IUseCase<IAuthCredentials, ISignInRes> {
  constructor(
    private readonly _authService: IAuthService,
    private readonly _hashProvider: IHashProvider,
    private readonly _jwtProvider: IJwtProvider,
  ) {}

  async execute(input: IAuthCredentials): Promise<ISignInRes> {
    const auth = await this._authService.getByEmail(input.email);

    if (!auth) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await this._hashProvider.compareHash(
      input.password,
      auth.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

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

    const decodedToken = await this._jwtProvider.verifyToken(refreshToken);

    const refreshTokenExpirationDate = new Date(decodedToken.exp! * 1000);

    await this._authService.update(auth.id, {
      refreshToken,
      refreshTokenExpiresAt: refreshTokenExpirationDate,
      lastSignInAt: new Date(),
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
