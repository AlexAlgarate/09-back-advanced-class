import { Response, Request } from 'express';

import { FindProductsUseCase } from '@domain/use-cases/product/find-products-usecase';
import { ProductMongodbRepository } from '@infrastructure/repositories/product-mongo-repository';

export const findProductsController = async (
  _request: Request,
  response: Response
): Promise<void> => {
  const productMongodbRepository = new ProductMongodbRepository();
  const findProductUseCase = new FindProductsUseCase(productMongodbRepository);

  const products = await findProductUseCase.execute();

  response.json({ content: products });
};
