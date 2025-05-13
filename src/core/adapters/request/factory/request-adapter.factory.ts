import { Request } from 'express';
import { RequestAdapter } from '../express-request.adapter';
import { IRawRequest } from '../interface/request-adapter.interface';

export class RequestAdapterFactory {
  static createFromExpressRequest(expressRequest: Request): RequestAdapter {
    const rawRequest: IRawRequest = {
      path: expressRequest.path,
      method: expressRequest.method,
      body: expressRequest.body,
      query: expressRequest.query,
      params: expressRequest.params,
      cookies: expressRequest.cookies,
      headers: expressRequest.headers,
      user: 'user' in expressRequest ? expressRequest.user : undefined,
    };

    return new RequestAdapter(rawRequest);
  }
}
