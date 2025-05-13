import {
  IRawRequest,
  IRequestAdapter,
} from './interface/request-adapter.interface';

export class RequestAdapter<
  UserType = Record<string, any>,
  BodyType = Record<string, any>,
> implements IRequestAdapter<UserType, BodyType>
{
  constructor(private readonly rawRequest: IRawRequest) {}

  get path(): string {
    return this.rawRequest.path || '';
  }

  get method(): string {
    return this.rawRequest.method || '';
  }

  get body(): BodyType {
    return this.rawRequest.body as BodyType;
  }

  get query(): Record<string, string> | undefined {
    return this.rawRequest.query as Record<string, string>;
  }

  get params(): Record<string, string> | undefined {
    return this.rawRequest.params;
  }

  get cookies(): { [key: string]: string } | undefined {
    return this.rawRequest.cookies;
  }

  get headers(): { [key: string]: string | string[] | undefined } {
    return this.rawRequest.headers || {};
  }

  get user(): UserType | undefined {
    return this.rawRequest.user as UserType;
  }

  getHeader(name: string): string | string[] | undefined {
    return this.headers[name.toLowerCase()];
  }

  getCookie(name: string): string | undefined {
    return this.cookies?.[name];
  }

  getUnderlying(): unknown {
    return this.rawRequest;
  }
}
