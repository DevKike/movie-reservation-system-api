import { Inject, RequestTimeoutException } from '@nestjs/common';
import { IMailerProvider } from './interface/mailer.provider.interface';
import mailerConfig from '../config/mailer.config';
import { ConfigType } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { IMail } from 'src/lib/common/domain/providers/interfaces/mailer/mail.interface';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

export class MailerProvider implements IMailerProvider {
  private readonly _mailerTransporter: Transporter;
  private readonly _templatesPath: string;

  constructor(
    @Inject(mailerConfig.KEY)
    private readonly _mailerConfig: ConfigType<typeof mailerConfig>,
  ) {
    this._mailerTransporter = createTransport({
      host: _mailerConfig.host,
      port: _mailerConfig.port,
      secure: _mailerConfig.isSecure,
      auth: {
        user: _mailerConfig.credentials.user,
        pass: _mailerConfig.credentials.password,
      },
    });

    this._templatesPath = path.join(
      process.cwd(),
      'src',
      'shared',
      'templates',
    );
  }

  async sendMail(mail: IMail): Promise<void> {
    try {
      const compiledHtml = this.compileTemplate(
        mail.template.name,
        mail.template.context,
      );

      await this._mailerTransporter.sendMail({
        from: mail.from || this._mailerConfig.fromName,
        to: mail.to,
        subject: mail.subject,
        html: compiledHtml,
      });
    } catch {
      throw new RequestTimeoutException();
    }
  }

  private compileTemplate(
    templateName: string,
    context: Record<string, any>,
  ): string {
    try {
      const templatePath = path.join(
        this._templatesPath,
        `${templateName}.hbs`,
      );

      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template ${templateName} not found`);
      }

      const templateContent = fs.readFileSync(templatePath, 'utf8');
      const template = handlebars.compile(templateContent);

      return template(context);
    } catch {
      throw new RequestTimeoutException();
    }
  }
}
