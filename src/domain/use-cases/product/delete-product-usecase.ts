import { ProductRepository } from '@domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: string): Promise<void> {
    const isRemoved = await this.productRepository.removeById(productId);

    if (!isRemoved) {
      throw new Error('Product can not be removed');
    }
  }
}
