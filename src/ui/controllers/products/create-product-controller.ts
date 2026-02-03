import { Request, Response } from 'express';
import * as z from 'zod';
import { ProductMongodbRepository } from '@infrastructure/repositories/product-mongo-repository';
import { CreateProductUseCase } from '@domain/use-cases/product/create-product-usecase';

const creationProductBodyValidator = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(3).max(150).optional(),
});

const userRequestValidator = z.object({
  id: z.string(),
});

export const createProductController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { name, description } = creationProductBodyValidator.parse(request.body);
  const { id: userId } = userRequestValidator.parse(request.user);

  if (typeof name !== 'string' || typeof description !== 'string') {
    return response.status(400).json({
      message: 'name and description have to be dedfined',
    });
  }

  const productMongodbRepository = new ProductMongodbRepository();
  const createProductUseCase = new CreateProductUseCase(productMongodbRepository);

  // Si mañana queremos cambiar a un sistema de guardado en memoria, con hacer este cambio
  // sería más que suficiente.
  // const productMemoryRepository = new ProductMemoryRepository();
  // const createProductUseCase = new CreateProductUseCase(productMemoryRepository);

  const createdProduct = await createProductUseCase.execute({
    name,
    description,
    userId: userId,
  });

  return response.status(201).json({ content: createdProduct });
};
