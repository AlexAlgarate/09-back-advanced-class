import { Response, Request } from 'express';

import { FindProductsUseCase } from '@domain/use-cases/product/find-products-usecase';
import { ProductFactory } from '@ui/factories/product-factory';

export const findProductsController = async (
  _request: Request,
  response: Response
): Promise<void> => {
  const productRepository = ProductFactory.createRepository();
  const findProductUseCase = new FindProductsUseCase(productRepository);

  const products = await findProductUseCase.execute();

  response.json({ content: products });
};
