import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';

export class FindProductsUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findMany();

    return products;
  }
}
