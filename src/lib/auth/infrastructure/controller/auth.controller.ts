import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CONSTANT } from 'src/common/constants/constant';
import { SignUpDTO } from '../dtos/sign-up.dto';
import { IAuthUseCase } from '../../domain/interfaces/use-case/auth.use-case.interface';
import {
  IAuthCredentials,
  ISignInRes,
  ISignUp,
  ISignUpRes,
} from '../../domain/interfaces/entity/auth.entity.interface';
import { AuthCredentialsDTO } from '../dtos/auth-credentials.dto';
import { Public } from '../decorators/auth/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_UP_ADMIN)
    private readonly _signUpAdminUseCase: IAuthUseCase<ISignUpRes, ISignUp>,
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_UP_USER)
    private readonly _signUpUserUseCase: IAuthUseCase<ISignUpRes, ISignUp>,
    @Inject(CONSTANT.USE_CASES.AUTH.SIGN_IN)
    private readonly _signInUseCase: IAuthUseCase<ISignInRes, IAuthCredentials>,
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

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() data: AuthCredentialsDTO) {
    return await this._signInUseCase.execute(data);
  }
}
