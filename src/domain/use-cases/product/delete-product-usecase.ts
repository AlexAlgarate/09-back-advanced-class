import { ProductRepository } from '@domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: string, userId: string): Promise<void> {
    // es el usuario que hace la petición el mismo que ha creado el producto?

    // necesitamos el product que tenemos que borrar
    const productToRemove = await this.productRepository.findById(productId);

    if (!productToRemove) {
      throw new Error('Product not found');
    }
    if (userId !== productToRemove.ownerId) {
      throw new Error('Forbidden operation');
    }
    const isRemoved = await this.productRepository.removeById(productId);

    if (!isRemoved) {
      throw new Error('Product can not be removed');
    }
  }
}
