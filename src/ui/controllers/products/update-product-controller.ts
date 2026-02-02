import { Response, Request } from 'express';

import { UpdateProductUseCase } from '@domain/use-cases/product/update-product-usecase';
import { ProductMongodbRepository } from '@infrastructure/repositories/product-mongo-repository';

export const updateProductController = async (
  request: Request<{ productId: string }, unknown, { name?: string; description?: string }>,
  response: Response
): Promise<void> => {
  const { productId } = request.params;
  const { name, description } = request.body;

  const productMongodbRepository = new ProductMongodbRepository();
  const updateProductUseCase = new UpdateProductUseCase(productMongodbRepository);

  try {
    const updateProduct = await updateProductUseCase.execute(
      productId,
      { name, description },
      request.user?.id as string // !
    );
    response.json({ content: updateProduct });
  } catch (error) {
    // !
    response.status(400).json({ message: 'Not found' });
  }
};
