import { IMail } from 'src/lib/common/domain/interfaces/providers/mailer/mail.interface';

export interface IMailerProvider {
  sendMail(mail: IMail): Promise<void>;
}
