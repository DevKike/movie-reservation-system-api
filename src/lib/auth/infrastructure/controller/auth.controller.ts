import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { SignOnAdminUseCase } from '../../application/sign-on-admin.use-case';
import { SignOnDTO } from '../dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CONSTANT.USE_CASES.SIGN_ON_ADMIN)
    private readonly _SignOnAdminUseCase: SignOnAdminUseCase,
    @Inject(CONSTANT.USE_CASES.SIGN_ON_USER)
    private readonly _SignOnUserUseCase: SignOnAdminUseCase,
  ) {}

  @Post('admin/sign-on')
  async signOnAdmin(@Body() data: SignOnDTO) {
    return await this._SignOnAdminUseCase.execute(data);
  }

  @Post('user/sign-on')
  async signOnUser(@Body() data: SignOnDTO) {
    return await this._SignOnUserUseCase.execute(data);
  }
}
