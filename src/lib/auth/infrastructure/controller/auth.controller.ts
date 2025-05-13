import {
  Body,
  Controller,
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
  ISignInRes,
  ISignUp,
  ISignUpRes,
} from '../../domain/interfaces/entity/auth.entity.interface';
import { AuthCredentialsDTO } from '../dtos/auth-credentials.dto';
import { AuthCookieInterceptor } from 'src/core/interceptors/auth-cookie/auth-cookie.interceptor';
import { Public } from '../decorators/auth/auth.decorator';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_UP_ADMIN)
    private readonly _signUpAdminUseCase: IUseCase<ISignUp, ISignUpRes>,
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_UP_USER)
    private readonly _signUpUserUseCase: IUseCase<ISignUp, ISignUpRes>,
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_IN)
    private readonly _signInUseCase: IUseCase<IAuthCredentials, ISignInRes>,
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

  @UseInterceptors(AuthCookieInterceptor)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() data: AuthCredentialsDTO): Promise<ISignInRes> {
    return await this._signInUseCase.execute(data);
  }

  /*   
  @UseInterceptors(AuthCookieInterceptor)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(data: RefreshTokenDTO) {
    return await this.
  } */

  /*   @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  async signOut() {} */
}
