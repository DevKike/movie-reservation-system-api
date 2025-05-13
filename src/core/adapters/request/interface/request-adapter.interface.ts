export interface IRequestAdapter<
  UserType = Record<string, any>,
  BodyType = Record<string, any>,
> {
  path: string;
  method: string;

  body?: BodyType;
  query?: Record<string, string>;
  params?: Record<string, string>;

  cookies?: {
    [key: string]: string;
  };
  headers: {
    [key: string]: string | string[] | undefined;
  };

  user?: UserType;

  getHeader(name: string): string | string[] | undefined;
  getCookie(name: string): string | undefined;

  getUnderlying(): unknown;
}

export interface IRawRequest {
  path?: string;
  method?: string;
  body?: unknown;
  query?: Record<string, unknown>;
  params?: Record<string, string>;
  cookies?: Record<string, string>;
  headers?: Record<string, string | string[] | undefined>;
  user?: unknown;
  [key: string]: unknown;
}
