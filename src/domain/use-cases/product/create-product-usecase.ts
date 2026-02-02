import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { ProductCreationQuery } from '@domain/types/product/ProductCreationQuery';

export class CreateProductUseCase {
  readonly productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }
  public async execute({ name, description, userId }: ProductCreationQuery): Promise<Product> {
    const createdProduct = await this.productRepository.createOne({ name, description, userId });
    return createdProduct;
  }
}
