import { CustomException } from './custom.exception';
import { HTTP_STATUS } from './enums/http-status-code.enum';

export class BadRequestException extends CustomException {
  constructor(message?: string) {
    super(HTTP_STATUS.BAD_REQUEST, message ?? 'Bad Request');
  }
}
