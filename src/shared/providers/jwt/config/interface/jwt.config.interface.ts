export interface IJwtConfig {
  secretKey: string;
  accessExpiresIn: string | undefined;
  refreshExpiresIn: string | undefined;
  audience: string | undefined;
  issuer: string | undefined;
}
