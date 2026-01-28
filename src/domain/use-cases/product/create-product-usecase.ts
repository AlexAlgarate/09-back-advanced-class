import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';

export class CreateProductUseCase {
  readonly productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }
  public async execute({
    name,
    description,
  }: {
    name: string;
    description: string;
  }): Promise<Product> {
    const createdProduct = await this.productRepository.createOne({ name, description });
    return createdProduct;
  }
}
