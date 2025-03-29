export const CONSTANT = {
  PROVIDERS: {
    //USERS
    USERS_SERVICE: 'UsersService',

    //ROLES
    ROLES_SERVICE: 'RolesService',

    //AUTH
    AUTH_SERVICE: 'AuthService',
    HASH_SERVICE: 'HashService',
    JWT_SERVICE: 'JwtProvider',
  },

  USE_CASES: {
    //USERS
    GET_ALL_USERS: 'GetAllUsersUseCase',
    GET_USER: 'GetUserUseCase',
    UPDATE_USER: 'UpdateUserUseCase',

    //ROLES
    GET_ALL_ROLES: 'GetAllRolesUseCase',

    //AUTH
    SIGN_ON_ADMIN: 'SignOnAdminUseCase',
    SIGN_ON_USER: 'SignOnUserUseCase',
    SIGN_IN: 'SignInUseCase',
  },
};
