export class CustomException extends Error {
  public statusCode: number;
  constructor(statusCode: number, message?: string) {
    super(message ?? 'An error occurred');
    this.statusCode = statusCode;
  }
}
