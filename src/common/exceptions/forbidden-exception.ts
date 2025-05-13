import { CustomException } from './custom.exception';
import { HttpStatus } from './enums/http-status-code.enum';

export class ForbiddenException extends CustomException {
  constructor(message?: string) {
    super(HttpStatus.FORBIDDEN, message ?? 'Access denied');
  }
}
