import { CustomException } from './custom.exception';
import { HttpStatus } from './enums/http-status-code.enum';

export class NotFoundException extends CustomException {
  constructor(message?: string) {
    super(HttpStatus.NOT_FOUND, message ?? 'Resource not Found');
  }
}
