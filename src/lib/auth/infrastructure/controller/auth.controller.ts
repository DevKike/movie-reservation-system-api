import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { SignUpDTO } from '../dtos/sign-up.dto';
import { IUseCase } from 'src/lib/common/domain/use-case/interfaces/use-case.interface';
import {
  IAuthCredentials,
  IAuthTokens,
  ISignInRes,
  ISignOutRes,
  ISignUp,
  ISignUpRes,
} from '../../domain/interfaces/entity/auth.entity.interface';
import { AuthCredentialsDTO } from '../dtos/auth-credentials.dto';
import { AuthCookieInterceptor } from 'src/lib/auth/infrastructure/interceptors/auth-cookie/auth-cookie.interceptor';
import { Public } from '../decorators/auth/auth.decorator';
import { RefreshToken } from '../decorators/auth/refresh-token.decorator';
import { ActiveUser } from '../decorators/auth/active-user.decorator';
import { IJwtPayload } from 'src/lib/common/domain/providers/interfaces/jwt/jwt-payload.interface';
import { AuthCookieClearInterceptor } from '../interceptors/auth-cookie/auth-cookie-clear.interceptor';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_UP_ADMIN)
    private readonly _signUpAdminUseCase: IUseCase<ISignUp, ISignUpRes>,
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_UP_USER)
    private readonly _signUpUserUseCase: IUseCase<ISignUp, ISignUpRes>,
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_IN)
    private readonly _signInUseCase: IUseCase<IAuthCredentials, ISignInRes>,
    @Inject(CONSTANT.USE_CASES.AUTH.REFRESH_AUTH)
    private readonly _refreshAuthUseCase: IUseCase<
      IAuthTokens['refreshToken'],
      ISignInRes
    >,
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_OUT)
    private readonly _signOutUseCase: IUseCase<
      IAuthTokens['refreshToken'],
      ISignOutRes
    >,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('admin/sign-up')
  async signUpAdmin(@Body() data: SignUpDTO): Promise<ISignUpRes> {
    return await this._signUpAdminUseCase.execute(data);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('user/sign-up')
  async signUpUser(@Body() data: SignUpDTO): Promise<ISignUpRes> {
    return await this._signUpUserUseCase.execute(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify')
  verifyAuth(@ActiveUser() user: IJwtPayload): { isValid: boolean; user: any } {
    return {
      isValid: true,
      user: {
        id: user.sub,
        email: user.email,
        roleId: user.roleId,
      },
    };
  }

  @UseInterceptors(AuthCookieInterceptor)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() data: AuthCredentialsDTO): Promise<ISignInRes> {
    return await this._signInUseCase.execute(data);
  }

  @UseInterceptors(AuthCookieInterceptor)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@RefreshToken() token: string): Promise<ISignInRes> {
    return await this._refreshAuthUseCase.execute(token);
  }

  @UseInterceptors(AuthCookieClearInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  async signOut(@RefreshToken() token: string): Promise<ISignOutRes> {
    return await this._signOutUseCase.execute(token);
  }
}
