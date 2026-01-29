import { Response, Request } from 'express';
import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import { UpdateProductUseCase } from '../../../domain/use-cases/product/update-product-usecase';

export const updateProductController = async (
  request: Request<{ productId: string }, unknown, { name?: string; description?: string }>,
  response: Response
): Promise<void> => {
  const { productId } = request.params;
  const { name, description } = request.body;

  try {
    const productMongodbRepository = new ProductMongodbRepository();
    const updateProductUseCase = new UpdateProductUseCase(productMongodbRepository);

    const updateProduct = await updateProductUseCase.execute({ id: productId, name, description });

    response.json({ content: updateProduct });
  } catch (error) {
    response.status(400).json({
      message: (error as Error).message,
    });
  }
};
