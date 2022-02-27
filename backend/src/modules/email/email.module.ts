import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
// import { MailgunModule } from '@nextnm/nestjs-mailgun';

@Module({
  imports: [
    // MailgunModule.forAsyncRoot({
    //   useFactory: async () => {
    //     return {
    //       DOMAIN: process.env.MAILGUN_API_DOMAIN,
    //       API_KEY: process.env.MAILGUN_API_KEY,
    //       HOST: 'api.eu.mailgun.net', // default: 'api.mailgun.net'.
    //     };
    //   },
    // }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
