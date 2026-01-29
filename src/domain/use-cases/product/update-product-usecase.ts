import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';

export class UpdateProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute({
    id,
    name,
    description,
  }: {
    id: string;
    name?: string;
    description?: string;
  }): Promise<Product> {
    const updateProduct = await this.productRepository.updateOne({ id, name, description });
    return updateProduct;
  }
}
