import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { SignOnDTO } from '../dtos/sign-in.dto';
import { IAuthUseCase } from '../../domain/interfaces/use-case/auth.use-case.interface';
import {
  IAuthCredentials,
  ISignInRes,
  ISignOn,
  ISignOnRes,
} from '../../domain/interfaces/entity/auth.entity.interface';
import { AuthCredentialsDTO } from '../dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CONSTANT.USE_CASES.SIGN_ON_ADMIN)
    private readonly _SignOnAdminUseCase: IAuthUseCase<ISignOnRes, ISignOn>,
    @Inject(CONSTANT.USE_CASES.SIGN_ON_USER)
    private readonly _SignOnUserUseCase: IAuthUseCase<ISignOnRes, ISignOn>,
    @Inject(CONSTANT.USE_CASES.SIGN_IN)
    private readonly _SignInUseCase: IAuthUseCase<ISignInRes, IAuthCredentials>,
  ) {}

  @Post('sign-in')
  async signIn(@Body() data: AuthCredentialsDTO) {
    return await this._SignInUseCase.execute(data);
  }

  @Post('admin/sign-on')
  async signOnAdmin(@Body() data: SignOnDTO) {
    return await this._SignOnAdminUseCase.execute(data);
  }

  @Post('user/sign-on')
  async signOnUser(@Body() data: SignOnDTO) {
    return await this._SignOnUserUseCase.execute(data);
  }
}
