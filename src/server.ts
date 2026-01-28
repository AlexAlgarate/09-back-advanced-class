import mongoose from 'mongoose';
import { startHTTPApi } from './api';

const connectMongoDb = async (): Promise<void> => {
  await mongoose.connect('mongodb://admin:admin123@localhost:27017/db?authSource=admin');
  console.log('Mongodb connected!');
};

const executeApp = async (): Promise<void> => {
  try {
    await connectMongoDb();
    startHTTPApi();
  } catch (error) {
    console.log('Unable to start application', error);
    process.exit(1);
  }
};

await executeApp();
