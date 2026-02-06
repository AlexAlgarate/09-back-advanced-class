import { Response, Request } from 'express';
import * as z from 'zod';
import { FindProductsUseCase } from '@domain/use-cases/product/find-products-usecase';
import { ProductFactory } from '@ui/factories/product-factory';
import { MailtrapService } from '@infrastructure/services/email-service';

const findProductsValidator = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number().max(100),
  search: z.string().optional(),
});

export const findProductsController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { page, limit, search } = findProductsValidator.parse(request.query);

  const productRepository = ProductFactory.createRepository();
  const findProductUseCase = new FindProductsUseCase(productRepository);

  const products = await findProductUseCase.execute({ page, limit, name: search });

  response.json({ content: products });
};
