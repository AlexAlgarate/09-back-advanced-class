import { Request, Response } from 'express';

import { FindProductUseCase } from '@domain/use-cases/product/find-product-by-id-usecase';
import { ProductFactory } from '@ui/factories/product-factory';
import { productIdParamsSchema } from '@ui/validators/product-validators';

export const findProductController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { productId } = productIdParamsSchema.parse(request.params);

  const productRepository = ProductFactory.createRepository();
  const findProductUseCase = new FindProductUseCase(productRepository);

  const product = await findProductUseCase.execute(productId);

  if (!product) {
    response.status(404).json({ error: 'Product Not Found' });
  }
  response.json({ content: product });
};
