import { HTTP_STATUS } from './enums/http-status-code.enum';

export class CustomException extends Error {
  public statusCode: HTTP_STATUS;

  constructor(statusCode: HTTP_STATUS, message?: string) {
    super(message ?? 'Error');
    this.statusCode = statusCode;
  }
}
