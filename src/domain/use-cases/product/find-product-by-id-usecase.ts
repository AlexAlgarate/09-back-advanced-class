import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';

export class FindProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute({ id }: { id: string }): Promise<Product | null> {
    const product = await this.productRepository.findById({ id });

    return product;
  }
}
