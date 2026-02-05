import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { Pagination } from '@domain/types/pagination';

export class FindProductsUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute({ page, limit }: Pagination): Promise<Product[]> {
    const products = await this.productRepository.findMany({ page, limit });

    return products;
  }
}
