import { Response, Request } from 'express';
import * as z from 'zod';

import { UpdateProductUseCase } from '@domain/use-cases/product/update-product-usecase';
import { ProductMongodbRepository } from '@infrastructure/repositories/product-mongo-repository';

const updateProductParamsValidator = z.object({
  productId: z.string(),
});

const updateProductBodyValidator = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).max(150).optional(),
});

const userRequestValidator = z.object({
  id: z.string(),
});
export const updateProductController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { productId } = updateProductParamsValidator.parse(request.params);
  const { name, description } = updateProductBodyValidator.parse(request.body);
  const { id: userId } = userRequestValidator.parse(request.user);

  const productMongodbRepository = new ProductMongodbRepository();
  const updateProductUseCase = new UpdateProductUseCase(productMongodbRepository);

  try {
    const updateProduct = await updateProductUseCase.execute(
      productId,
      { name, description },
      userId
    );
    response.json({ content: updateProduct });
  } catch (error) {
    // !
    response.status(400).json({ message: 'Not found' });
  }
};
