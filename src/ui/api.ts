import express, { json } from 'express';
import productRouter from './routes/product-routes';
import authenticationRouter from './routes/authentication-routes';
export const app = express();

// Middleware para decirle a Express que los body serán JSON (método POST)
app.use(json());

app.use('/products', productRouter);
app.use('/products/:productId', productRouter);
app.use('/authentication', authenticationRouter);
export const startHTTPApi = (): void => {
  app.listen(3000, () => {
    console.log('Up & running on port: ', 3000);
  });
};
