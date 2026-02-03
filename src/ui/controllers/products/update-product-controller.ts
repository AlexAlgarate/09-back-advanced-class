import { Response, Request } from 'express';

import { UpdateProductUseCase } from '@domain/use-cases/product/update-product-usecase';
import { ProductFactory } from '@ui/factories/product-factory';
import {
  authenticatedUserSchema,
  productIdParamsSchema,
  updateProductBodySchema,
} from '@ui/validators/product-validators';

export const updateProductController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { productId } = productIdParamsSchema.parse(request.params);
  const { name, description } = updateProductBodySchema.parse(request.body);
  const { id: userId } = authenticatedUserSchema.parse(request.user);

  const productRepository = ProductFactory.createRepository();
  const updateProductUseCase = new UpdateProductUseCase(productRepository);

  try {
    const updateProduct = await updateProductUseCase.execute(
      productId,
      { name, description },
      userId
    );
    response.json({ content: updateProduct });
  } catch (error) {
    // !
    response.status(404).json({ message: 'Product not found' });
  }
};
