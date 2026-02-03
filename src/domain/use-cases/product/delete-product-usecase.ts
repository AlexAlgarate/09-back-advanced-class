import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { ForbiddenOperation } from '@domain/types/errors';

export class DeleteProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: string, userId: string): Promise<void> {
    // es el usuario que hace la petición el mismo que ha creado el producto?

    // necesitamos el product que tenemos que borrar
    const productToRemove = await this.getProductToRemove(productId);

    this.ensureUserIsOwner(userId, productToRemove.ownerId);

    const isRemoved = await this.productRepository.removeById(productId);

    if (!isRemoved) {
      throw new Error('Product can not be removed');
    }
  }

  private async getProductToRemove(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  private ensureUserIsOwner(userId: string, ownerId: string): void {
    if (userId !== ownerId) {
      throw new ForbiddenOperation('Forbidden operation');
    }
  }
}
