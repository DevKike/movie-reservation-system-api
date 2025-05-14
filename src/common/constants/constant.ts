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

    MOVIE: {
      MOVIES_SERVICE: 'MoviesService',
    },

    UPLOAD: {
      UPLOADS_PROVIDER: 'S3Provider',
      UPLOADS_SERVICE: 'UploadsService',
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

    MOVIE: {
      ADD_MOVIE: 'AddMovieUseCase',
    },
  },

  KEYS: {
    CONFIG: {
      DATABASE: 'database',
      ROOT_USER: 'rootUser',
      JWT: 'jwt',
      UPLOADS: 'uploads',
    },

    IS_PUBLIC: 'isPublic',
    USER: 'user',
    ROLE: 'role',
    REFRESH_TOKEN: 'refreshToken',
    FILE: 'file',
    IMAGES_PATH: 'images',
  },

  ROLE_IDS: {
    ROOT: 1,
    ADMIN: 2,
    USER: 3,
  },
};
