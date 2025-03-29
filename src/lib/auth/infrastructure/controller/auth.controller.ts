import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { SignInAdminUseCase } from '../../application/sign-in-admin.use-case';
import { SignInDTO } from '../dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CONSTANT.USE_CASES.SIGN_IN_ADMIN)
    private readonly _signInAdminUseCase: SignInAdminUseCase,
  ) {}

  @Post('sign-in')
  async signInAdmin(@Body() data: SignInDTO) {
    return await this._signInAdminUseCase.execute(data);
  }
}
