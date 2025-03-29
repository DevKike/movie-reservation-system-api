import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { SignOnAdminUseCase } from '../../application/sign-on-admin.use-case';
import { SignOnDTO } from '../dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CONSTANT.USE_CASES.SIGN_IN_ADMIN)
    private readonly _SignOnAdminUseCase: SignOnAdminUseCase,
  ) {}

  @Post('sign-on')
  async SignOnAdmin(@Body() data: SignOnDTO) {
    return await this._SignOnAdminUseCase.execute(data);
  }
}
