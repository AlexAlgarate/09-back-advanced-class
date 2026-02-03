import { Request, Response } from 'express';
import * as z from 'zod';

import { DeleteProductUseCase } from '@domain/use-cases/product/delete-product-usecase';
import { ProductFactory } from '@ui/factories/product-factory';

const deleteProductParamsValidator = z.object({
  productId: z.string(),
});

const userRequestValidator = z.object({
  id: z.string(),
});

export const deleteProductController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { productId } = deleteProductParamsValidator.parse(request.params);
  const { id: userId } = userRequestValidator.parse(request.user);

  const productRepository = ProductFactory.createRepository();
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);

  try {
    await deleteProductUseCase.execute(productId, userId);
    response.json({ message: 'Product removed successfully' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    response.status(404).json({ message: 'Product not found' });
  }
};
