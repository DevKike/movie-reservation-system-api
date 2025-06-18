import { CustomException } from './custom.exception';
import { HTTP_STATUS } from './enums/http-status-code.enum';

export class ForbiddenException extends CustomException {
  constructor(message?: string) {
    super(HTTP_STATUS.FORBIDDEN, message ?? 'Access denied');
  }
}
