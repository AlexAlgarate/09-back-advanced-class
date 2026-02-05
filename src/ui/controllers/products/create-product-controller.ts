import { Request, Response } from 'express';

import { CreateProductUseCase } from '@domain/use-cases/product/create-product-usecase';
import { ProductFactory } from '@ui/factories/product-factory';
import {
  authenticatedUserSchema,
  createProductBodySchema,
} from '@ui/validators/product-validators';

export const createProductController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { name, description } = createProductBodySchema.parse(request.body);
  const { id: userId } = authenticatedUserSchema.parse(request.user);

  // Si mañana queremos cambiar a un sistema de guardado en memoria, con hacer este cambio
  // sería más que suficiente.
  // const productMemoryRepository = new ProductMemoryRepository();
  // const createProductUseCase = new CreateProductUseCase(productMemoryRepository);
  const productRepository = ProductFactory.createRepository();
  // En el caso de querer cambiar el repo, habría que ir a la factoría en lugar de instanciarlo aquí
  const createProductUseCase = new CreateProductUseCase(productRepository);

  const createdProduct = await createProductUseCase.execute({
    name,
    description,
    userId: userId,
  });

  response.status(201).json({ content: createdProduct });
};
