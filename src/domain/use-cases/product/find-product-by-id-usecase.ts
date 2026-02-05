import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { EntityNotFoundError } from '@domain/types/errors';

export class FindProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: string): Promise<Product | null> {
    const product = await this.productRepository.findById(productId);

    if (!product) throw new EntityNotFoundError('Product', productId);
    return product;
  }
}
