import express from 'express';
import mongoose from 'mongoose';
import productRouter from './product.routes.js';

const connectMongoDb = async () => {
  await mongoose.connect('mongodb://admin:admin123@localhost:27017/db?authSource=admin');
  console.log('Mongodb connected!');
};

const startHTTPApi = () => {
  const app = express();

  // Middleware para decirle a Express que los body serán JSON (método POST)
  app.use(express.json());

  app.use('/products', productRouter);
  app.use('/products/:productId', productRouter);

  app.listen(3000, () => {
    console.log('Up & running on port: ', 3000);
  });
};
const executeApp = async () => {
  try {
    await connectMongoDb();
    startHTTPApi();
  } catch (error) {
    console.log('Unable to start application', error);
    process.exit(1);
  }
};

executeApp();
