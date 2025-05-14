import { registerAs } from '@nestjs/config';
import { CONSTANT } from 'src/common/constants/constant';
import { Role } from 'src/lib/roles/infrastructure/entity/roles.entity';
import { User } from 'src/lib/users/infrastructure/entity/users.entity';
import { Auth } from 'src/lib/auth/infrastructure/entity/auth.entity';
import { IDatabaseConfig } from './interfaces/database.config.interface';
import { Movie } from 'src/lib/movies/infrastructure/entity/movies.entity';

export default registerAs(
  CONSTANT.KEYS.CONFIG.DATABASE,
  (): IDatabaseConfig => ({
    type: process.env.DB_TYPE!,
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME!,
    entities: [Role, User, Auth, Movie],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  }),
);
