import { ProductRepository } from '@domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: string): Promise<void> {
    if (!productId) {
      throw new Error('Product id is required');
    }

    await this.productRepository.deleteOne(productId);
  }
}
