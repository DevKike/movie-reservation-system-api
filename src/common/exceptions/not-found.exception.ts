import { CustomException } from './custom.exception';
import { HTTP_STATUS } from './enums/http-status-code.enum';

export class NotFoundException extends CustomException {
  constructor(message?: string) {
    super(HTTP_STATUS.NOT_FOUND, message ?? 'Resource not Found');
  }
}
