export const CONSTANT = {
  PROVIDERS: {
    USER: {
      USERS_SERVICE: 'UsersService',
    },
    ROLE: {
      ROLES_SERVICE: 'RolesService',
    },
    AUTH: {
      AUTH_SERVICE: 'AuthService',
      HASH_SERVICE: 'HashService',
      JWT_SERVICE: 'JwtProvider',
      APP_GUARD: 'APP_GUARD',
    },
  },

  USE_CASES: {
    USER: {
      GET_ALL_USERS: 'GetAllUsersUseCase',
      GET_USER: 'GetUserUseCase',
      UPDATE_USER: 'UpdateUserUseCase',
    },

    ROLE: {
      GET_ALL_ROLES: 'GetAllRolesUseCase',
    },

    AUTH: {
      SIGN_UP_ADMIN: 'SignUpAdminUseCase',
      SIGN_UP_USER: 'SignUpUserUseCase',
      SIGN_IN: 'SignInUseCase',
    },
  },

  KEYS: {
    IS_PUBLIC: 'isPublic',
    USER: 'user',
    ROLE: 'role',
  },
};
