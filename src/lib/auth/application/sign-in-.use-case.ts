import { BadRequestException } from 'src/lib/common/domain/exceptions/bad-request.exception';
import {
  IAuthCredentials,
  ISignInRes,
} from '../domain/interfaces/entity/auth.entity.interface';
import { IAuthService } from '../domain/interfaces/service/auth.service.interface';
import { IAuthUseCase } from '../domain/interfaces/use-case/auth.use-case.interface';
import { IHashService } from 'src/lib/common/domain/services/interfaces/hash/hash.service.interface';
import { IJwtService } from 'src/lib/common/domain/services/interfaces/jwt/jwt.service.interface';

export class SignInUseCase
  implements IAuthUseCase<ISignInRes, IAuthCredentials>
{
  constructor(
    private readonly _authService: IAuthService,
    private readonly _hashService: IHashService,
    private readonly _jwtService: IJwtService,
  ) {}

  async execute(input: IAuthCredentials): Promise<ISignInRes> {
    const auth = await this._authService.getByEmail(input.email);

    if (!auth) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await this._hashService.compareHash(
      input.password,
      auth.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const accessToken = await this._jwtService.signToken({
      sub: auth.id,
      email: auth.email,
      role: auth.user.role.name,
    });

    const refreshToken = await this._jwtService.signToken({ sub: auth.id });

    return { accessToken, refreshToken };
  }
}
