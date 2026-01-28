import { Request, Response } from 'express';
import { CreateProductUseCase } from '../../../domain/use-cases/product/create-product-usecase';
import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';

export const createProductController = async (request: Request, response: Response) => {
  // TODO fix
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, description } = request.body;

  if (!name || !description) {
    response.status(400).json({
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

  // TODO fix
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const createdProduct = await createProductUseCase.execute({ name, description });

  return response.status(201).json({ content: createdProduct });
};
