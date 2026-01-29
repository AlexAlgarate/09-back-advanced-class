import { Request, Response } from 'express';
import { CreateProductUseCase } from '../../../domain/use-cases/product/create-product-usecase';
import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';

export const createProductController = async (
  request: Request<{ productId: string }, unknown, { name?: string; description?: string }>,
  response: Response
): Promise<Response> => {
  const { name, description } = request.body;

  if (typeof name !== 'string' || typeof description !== 'string') {
    return response.status(400).json({
      message: 'name and description have to be dedfined',
    });
  }
  // inyectamos el caso de uso con un repositorio
  const productMongodbRepository = new ProductMongodbRepository();
  const createProductUseCase = new CreateProductUseCase(productMongodbRepository);

  // Si mañana queremos cambiar a un sistema de guardado en memoria, con hacer este cambio
  // sería más que suficiente.
  // const productMemoryRepository = new ProductMemoryRepository();
  // const createProductUseCase = new CreateProductUseCase(productMemoryRepository);

  const createdProduct = await createProductUseCase.execute({ name, description });

  return response.status(201).json({ content: createdProduct });
};
