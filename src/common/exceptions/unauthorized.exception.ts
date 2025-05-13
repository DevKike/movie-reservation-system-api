import { CustomException } from './custom.exception';
import { HttpStatus } from './enums/http-status-code.enum';

export class UnauthorizedException extends CustomException {
  constructor(message?: string) {
    super(
      HttpStatus.UNAUTHORIZED,
      message ?? 'Not authorized to access the resource',
    );
  }
}
