import { IMail } from './mail.interface';

export interface IMailerService {
  sendMail(mail: IMail): Promise<any  >;
}
