import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailPassCVDto } from './dto/sendPassCV.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendResetPasswordToken(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Token',
      template: './resetPasswordToken',
      context: {
        token,
      },
    });
  }

  async sendPassJobApplication(email: string, data: SendMailPassCVDto) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'PASS CV',
      template: './job-application-pass',
      context: {
        ...data,
      },
    });
  }
}
