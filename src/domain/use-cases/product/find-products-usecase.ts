import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { ProductFindQuery } from '@domain/types/product/ProductFindQuery';

export class FindProductsUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(query: ProductFindQuery): Promise<Product[]> {
    const products = await this.productRepository.findMany({ ...query });

    return products;
  }
}
