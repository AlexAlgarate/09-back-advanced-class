import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { ProductUpdateQuery } from '@domain/types/product/ProductUpdateQuery';

export class UpdateProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: string, query: ProductUpdateQuery): Promise<Product | null> {
    const updatedProduct = await this.productRepository.updateOne(productId, query);

    return updatedProduct;
  }
}
