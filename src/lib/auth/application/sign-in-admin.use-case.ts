import { IUserService } from 'src/lib/users/domain/interfaces/service/users.service.interface';
import {
  IAuth,
  ISignIn,
} from '../domain/interfaces/entity/auth.entity.interface';
import { IAuthService } from '../domain/interfaces/service/auth.service.interface';
import { ROLES } from 'src/lib/roles/domain/enums/roles.enum';
import { IRolesService } from 'src/lib/roles/domain/interfaces/service/roles.service.interface';
import { IAuthUseCase } from '../domain/interfaces/use-case/auth.use-case.interface';

export class SignInAdminUseCase implements IAuthUseCase<IAuth, ISignIn> {
  constructor(
    private readonly _authService: IAuthService,
    private readonly _rolesService: IRolesService,
    private readonly _usersService: IUserService,
  ) {}

  async execute(input: ISignIn): Promise<IAuth> {
    const adminRole = await this._rolesService.get(ROLES.ADMIN);

    const userCreated = await this._usersService.save({
      name: input.name,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      role: adminRole,
    });

    return this._authService.save({
      email: input.email,
      password: input.password,
      user: userCreated,
    });
  }
}
