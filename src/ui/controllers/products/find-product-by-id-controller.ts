import { Request, Response } from 'express';
import * as z from 'zod';

import { FindProductUseCase } from '@domain/use-cases/product/find-product-by-id-usecase';
import { ProductFactory } from '@ui/factories/product-factory';

const findProductValidator = z.object({
  productId: z.string(),
});

export const findProductController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { productId } = findProductValidator.parse(request.params);

  const productRepository = ProductFactory.createRepository();
  const findProductUseCase = new FindProductUseCase(productRepository);

  const product = await findProductUseCase.execute(productId);

  if (!product) {
    response.status(404).json({ error: 'Product Not Found' });
  }
  response.json({ content: product });
};
