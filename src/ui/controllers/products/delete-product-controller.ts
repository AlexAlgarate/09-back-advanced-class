import { Request, Response } from 'express';

import { DeleteProductUseCase } from '@domain/use-cases/product/delete-product-usecase';
import { ProductFactory } from '@ui/factories/product-factory';
import { authenticatedUserSchema, productIdParamsSchema } from '@ui/validators/product-validators';

export const deleteProductController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { productId } = productIdParamsSchema.parse(request.params);
  const { id: userId } = authenticatedUserSchema.parse(request.user);

  const productRepository = ProductFactory.createRepository();
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);

  await deleteProductUseCase.execute(productId, userId);
  response.json({ message: 'Product removed successfully' });
};
