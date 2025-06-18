import { CustomException } from './custom.exception';
import { HTTP_STATUS } from './enums/http-status-code.enum';

export class AlreadyExistsException extends CustomException {
  constructor(message?: string) {
    super(HTTP_STATUS.CONFLICT, message ?? 'Resource already exists');
  }
}
