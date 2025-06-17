import { IMailerService } from 'src/lib/common/domain/providers/interfaces/mailer/mailer.service.interface';
import { IMailerProvider } from './provider/interface/mailer.provider.interface';
import { IMail } from 'src/lib/common/domain/providers/interfaces/mailer/mail.interface';
import { RequestTimeoutException } from '@nestjs/common';

export class MailerService implements IMailerService {
  constructor(private readonly _mailerProvider: IMailerProvider) {}

  async sendMail(mail: IMail): Promise<any> {
    try {
      await this._mailerProvider.sendMail(mail);
    } catch {
      throw new RequestTimeoutException();
    }
  }
}
