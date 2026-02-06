import mongoose from 'mongoose';
import { startHTTPApi } from './ui/api';
import { environmentService } from '@infrastructure/services/environment-service';
import * as Sentry from '@sentry/node';
import { schedule } from 'node-cron';
import { UserMongoRepository } from '@infrastructure/repositories/user-mongo-repository';
import { ProductMongodbRepository } from '@infrastructure/repositories/product-mongo-repository';
import { MailtrapService } from '@infrastructure/services/email-service';
import { SendProductReportUseCase } from '@domain/use-cases/product/send-product-report-usecase';

const loadEnvironment = (): void => {
  console.log('...loading environment');
  environmentService.load();
  console.log('environment loaded...');
};
const connectMongoDb = async (): Promise<void> => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST } = environmentService.get();
  await mongoose.connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/db?authSource=admin`
  );
  console.log('Mongodb connected!');
};

const initializeSentry = (): void => {
  const { SENTRY_DSN, ENVIRONMENT } = environmentService.get();

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
  });
};

const startCronJobs = (): void => {
  const WeeklyReportEmailJob_weekly_monday_at_10 = '1 * * * *';
  schedule(WeeklyReportEmailJob_weekly_monday_at_10, async () => {
    console.log('Starting email sending service..');
    const userRepository = new UserMongoRepository();
    const productRepository = new ProductMongodbRepository();
    const emailService = new MailtrapService();
    const sendProductReportUseCase = new SendProductReportUseCase(
      userRepository,
      productRepository,
      emailService
    );

    try {
      await sendProductReportUseCase.execute();
      console.log('Email sent!!');
    } catch (error) {
      console.error('Error sending product report:', error);
    }
  });
};

const executeApp = async (): Promise<void> => {
  try {
    loadEnvironment();
    initializeSentry();
    await connectMongoDb();
    startHTTPApi();
    startCronJobs();
  } catch (error) {
    console.log('Unable to start application', error);
    process.exit(1);
  }
};

await executeApp();
