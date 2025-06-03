import { IMail } from 'src/lib/common/domain/providers/interfaces/mailer/mail.interface';

export interface IMailerProvider {
  sendMail(mail: IMail): Promise<void>;
}
