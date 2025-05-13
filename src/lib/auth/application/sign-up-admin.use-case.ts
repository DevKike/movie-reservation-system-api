import { IUsersService } from 'src/lib/users/domain/interfaces/service/users.service.interface';
import {
  ISignUp,
  ISignUpRes,
} from '../domain/interfaces/entity/auth.entity.interface';
import { IAuthService } from '../domain/interfaces/service/auth.service.interface';
import { ROLE } from 'src/lib/roles/domain/enums/roles.enum';
import { IRolesService } from 'src/lib/roles/domain/interfaces/service/roles.service.interface';
import { IAuthUseCase } from '../domain/interfaces/use-case/auth.use-case.interface';
import { AlreadyExistsException } from 'src/common/exceptions/already-exists.exception';
import { IHashProvider } from 'src/lib/common/domain/providers/interfaces/hash/hash.provider.interface';

export class SignOnAdminUseCase implements IAuthUseCase<ISignUpRes, ISignUp> {
  constructor(
    private readonly _authService: IAuthService,
    private readonly _rolesService: IRolesService,
    private readonly _usersService: IUsersService,
    private readonly _hashProvider: IHashProvider,
  ) {}

  async execute(input: ISignUp): Promise<ISignUpRes> {
    const authByEmail = await this._authService.getByEmail(input.email);

    if (authByEmail) throw new AlreadyExistsException('Email already exists');

    if (input.phoneNumber) {
      const authByPhoneNumber = await this._usersService.getByPhoneNumber(
        input.phoneNumber,
      );

      if (authByPhoneNumber)
        throw new AlreadyExistsException('Phone number already exists');
    }

    const adminRole = await this._rolesService.get(ROLE.ADMIN);

    const userCreated = await this._usersService.save({
      name: input.name,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      role: adminRole,
    });

    const hashedPassword = await this._hashProvider.hash(input.password);

    const createdAuth = await this._authService.save({
      email: input.email,
      password: hashedPassword,
      user: userCreated,
    });

    const { password, ...authWithoutPassword } = createdAuth;

    return { auth: authWithoutPassword };
  }
}
