import { Request, Response } from 'express';

import { ProductMongodbRepository } from '@infrastructure/repositories/product-mongo-repository';
import { DeleteProductUseCase } from '@domain/use-cases/product/delete-product-usecase';

export const deleteProductController = async (
  request: Request<{ productId: string }>,
  response: Response
): Promise<void> => {
  const { productId } = request.params;

  const productMongodbRepository = new ProductMongodbRepository();
  const deleteProductUseCase = new DeleteProductUseCase(productMongodbRepository);

  try {
    await deleteProductUseCase.execute(productId, request.user?.id as string);
    response.json({ message: 'Product removed successfully' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    response.status(400).json({ message: 'Product not found' });
  }
};
