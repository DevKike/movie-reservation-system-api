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
      HASH_PROVIDER: 'HashProvider',
      JWT_PROVIDER: 'JwtProvider',
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
      REFRESH_AUTH: 'RefreshAuthUseCase',
      SIGN_OUT: 'SignOutUseCase',
    },
  },

  KEYS: {
    CONFIG: {
      DATABASE: 'database',
      ROOT_USER: 'rootUser',
      JWT: 'jwt',
    },
    IS_PUBLIC: 'isPublic',
    USER: 'user',
    ROLE: 'role',
    REFRESH_TOKEN: 'refreshToken',
    AUTH_PATH: '/api/auth',
  },

  ROLE_IDS: {
    ROOT: 1,
    ADMIN: 2,
    USER: 3,
  },
};
