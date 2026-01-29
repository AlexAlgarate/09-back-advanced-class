import { Request, Response } from 'express';

import { ProductMongodbRepository } from '@infrastructure/repositories/product-mongo-repository';
import { DeleteProductUseCase } from '@domain/use-cases/product/delete-product-usecase';

export const deleteProductController = async (
  request: Request<{ productId: string }>,
  response: Response
): Promise<void> => {
  const { productId } = request.params;
  try {
    const productMongodbRepository = new ProductMongodbRepository();
    const deleteProductUseCase = new DeleteProductUseCase(productMongodbRepository);

    await deleteProductUseCase.execute(productId);
    response.json({ message: 'Product removed successfully' });
  } catch (error) {
    response.status(400).json({ message: (error as Error).message });
  }
};
