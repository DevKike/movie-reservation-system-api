import { CustomException } from './custom.exception';
import { HTTP_STATUS } from './enums/http-status-code.enum';

export class UnauthorizedException extends CustomException {
  constructor(message?: string) {
    super(
      HTTP_STATUS.UNAUTHORIZED,
      message ?? 'Not authorized to access the resource',
    );
  }
}
