import { IUserService } from 'src/lib/users/domain/interfaces/service/users.service.interface';
import {
  ISignOn,
  ISignOnRes,
} from '../domain/interfaces/entity/auth.entity.interface';
import { IAuthService } from '../domain/interfaces/service/auth.service.interface';
import { ROLES } from 'src/lib/roles/domain/enums/roles.enum';
import { IRolesService } from 'src/lib/roles/domain/interfaces/service/roles.service.interface';
import { IAuthUseCase } from '../domain/interfaces/use-case/auth.use-case.interface';
import { AlreadyExistsException } from 'src/lib/common/domain/exceptions/already-exists.exception';
import { IHashService } from 'src/lib/common/domain/services/interfaces/hash/hash.provider.interface';

export class SignOnUserUseCase implements IAuthUseCase<ISignOnRes, ISignOn> {
  constructor(
    private readonly _authService: IAuthService,
    private readonly _rolesService: IRolesService,
    private readonly _usersService: IUserService,
    private readonly _hashService: IHashService,
  ) {}

  async execute(input: ISignOn): Promise<ISignOnRes> {
    const authByEmail = await this._authService.getByEmail(input.email);

    if (authByEmail) throw new AlreadyExistsException('Email already exists');

    const userRole = await this._rolesService.get(ROLES.USER);

    const userCreated = await this._usersService.save({
      name: input.name,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      role: userRole,
    });

    const hashedPassword = await this._hashService.hash(input.password);

    const createdAuth = await this._authService.save({
      email: input.email,
      password: hashedPassword,
      user: userCreated,
    });

    const { password, ...authWithoutPassword } = createdAuth;

    return authWithoutPassword;
  }
}
