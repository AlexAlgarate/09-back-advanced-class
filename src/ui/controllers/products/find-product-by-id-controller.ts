import { Request, Response } from 'express';

import { FindProductUseCase } from '@domain/use-cases/product/find-product-by-id-usecase';
import { ProductMongodbRepository } from '@infrastructure/repositories/product-mongo-repository';

export const findProductController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { productId } = request.params;

  if (!productId || typeof productId !== 'string') {
    response.status(404).json({ error: 'Product Not Found' });
    return;
  }

  const productMongodbRepository = new ProductMongodbRepository();
  const findProductUseCase = new FindProductUseCase(productMongodbRepository);

  const product = await findProductUseCase.execute(productId);

  if (!product) {
    response.status(404).json({ error: 'Product Not Found' });
  }
  response.json({ content: product });
};
