import { Injectable } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';

// ИНТЕРФЕЙСЫ
// import { IEmailOptions } from './interfaces/email-options.interface';

@Injectable()
export class EmailService {
  constructor(private mailgunService: MailgunService) {}

  // async sendEmail(data: IEmailOptions): Promise<any> {
  //   return await this.mailgunService.createEmail(,data);
  // }

  // async verifyEmail(email: string): Promise<boolean> {
  //   return await this.mailgunService.validateEmail(email);
  // }
}
