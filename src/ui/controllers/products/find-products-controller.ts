import { Response, Request } from 'express';
import * as z from 'zod';
import { FindProductsUseCase } from '@domain/use-cases/product/find-products-usecase';
import { ProductFactory } from '@ui/factories/product-factory';

const findProductsValidator = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number().max(100),
});

export const findProductsController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { page, limit } = findProductsValidator.parse(request.query);

  const productRepository = ProductFactory.createRepository();
  const findProductUseCase = new FindProductsUseCase(productRepository);

  const products = await findProductUseCase.execute({ page, limit });

  response.json({ content: products });
};
