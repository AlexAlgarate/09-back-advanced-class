import express from 'express';
import productRouter from './routes/product-routes';

export const app = express();

// Middleware para decirle a Express que los body serán JSON (método POST)
app.use(express.json());

app.use('/products', productRouter);
app.use('/products/:productId', productRouter);

export const startHTTPApi = (): void => {
  app.listen(3000, () => {
    console.log('Up & running on port: ', 3000);
  });
};
