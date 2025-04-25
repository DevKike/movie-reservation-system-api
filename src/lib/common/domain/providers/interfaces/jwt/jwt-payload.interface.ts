export interface IBaseJwtPayload {
  sub: number;
  iat?: number;
  exp?: number;
}

export interface IJwtPayload extends IBaseJwtPayload {
  email: string;
  roleId: number;
}
