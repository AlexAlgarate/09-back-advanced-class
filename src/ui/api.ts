import express, { json } from 'express';
import productRouter from './routes/product-routes';
import authenticationRouter from './routes/authentication-routes';
import { errorHandlerMiddleware } from './middlewares/error-handler-middleware';
export const app = express();

// Middleware para decirle a Express que los body serán JSON (método POST)
app.use(json());

app.use('/products', productRouter);
app.use('/authentication', authenticationRouter);

// Middleware de errores a nivel global de la app
// ! ES IMPORTANTE QUE SEA EL ÚLTIMO DECLARADO
app.use(errorHandlerMiddleware);

export const startHTTPApi = (): void => {
  app.listen(3000, () => {
    console.log('Up & running on port: ', 3000);
  });
};
