import { CustomException } from './custom.exception';
import { HttpStatus } from './enums/http-status-code.enum';

export class BadRequestException extends CustomException {
  constructor(message?: string) {
    super(HttpStatus.BAD_REQUEST, message ?? 'Bad Request');
  }
}
