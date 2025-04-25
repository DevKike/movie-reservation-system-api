import * as Joi from 'joi';

export const environmentSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  SERVER_PORT: Joi.number().default(3000),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  HASH_SALT_ROUNDS: Joi.number().default(10),

  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),

  ROOT_USER_EMAIL: Joi.string().email().default('root@example.com'),
  ROOT_USER_PASSWORD: Joi.string().default('password123'),
  ROOT_USER_NAME: Joi.string().default('Root'),
  ROOT_USER_LASTNAME: Joi.string().default('Admin'),
  ROOT_USER_PHONE: Joi.string().default('1234567890'),
});
