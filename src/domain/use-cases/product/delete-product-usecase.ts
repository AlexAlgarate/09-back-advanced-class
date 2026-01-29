import { ProductRepository } from '../../repositories/ProductRepository';

export class DeleteProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute({ id }: { id: string }): Promise<void> {
    if (!id) {
      throw new Error('Product id is required');
    }

    await this.productRepository.deleteOne({ id });
  }
}
