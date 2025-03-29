import { CustomException } from './custom.exception';
import { HttpStatus } from './enums/http-status-code.enum';

export class AlreadyExistsException extends CustomException {
  constructor(message?: string) {
    super(HttpStatus.CONFLICT, message ?? 'Resource already exists');
  }
}
