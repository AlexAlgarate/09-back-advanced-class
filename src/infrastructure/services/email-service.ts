import { MailtrapClient } from 'mailtrap';

import { EmailService } from '@domain/services/EmailService';
import { environmentService } from './environment-service';

export class MailtrapService implements EmailService {
  private readonly mailtrapClient: MailtrapClient;
  private readonly isSandbox: boolean;

  constructor() {
    const { MAILTRAP_TOKEN, INBOXID, IS_SANDBOX } = environmentService.get();
    this.isSandbox = IS_SANDBOX === 'true';
    const inboxId = this.isSandbox ? Number(INBOXID) : undefined;

    this.mailtrapClient = new MailtrapClient({
      token: MAILTRAP_TOKEN,
      sandbox: this.isSandbox,
      testInboxId: inboxId,
    });
  }

  async sendEmail(email: string, message: string, subject: string): Promise<void> {
    console.log('\n\n\n\n', this.isSandbox, '\n\n\n\n');
    await this.mailtrapClient
      .send({
        from: {
          name: 'Mailtrap Test',
          // ! en la primera condición vale el email hello@demomailtrap.co y sandbox@example.com
          email: this.isSandbox ? 'hello@demomailtrap.co' : 'no-reply@your-domain.com',
        },
        to: [{ email }],
        subject: subject,
        text: message,
      })
      .then(console.log)
      .catch(console.error);
  }
}
