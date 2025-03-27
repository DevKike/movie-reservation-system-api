import { HTTP_CODES } from '../constants/http-codes.constant';
import { CustomException } from './custom.exception';

export class NotFoundException extends CustomException {
  constructor(message?: string) {
    super(HTTP_CODES.NOT_FOUND, message ?? 'Resource not found');
  }
}
