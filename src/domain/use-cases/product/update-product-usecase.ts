import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { EntityNotFoundError, ForbiddenOperation } from '@domain/types/errors';
import { ProductUpdateQuery } from '@domain/types/product/ProductUpdateQuery';

export class UpdateProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(
    productId: string,
    query: ProductUpdateQuery,
    userId: string
  ): Promise<Product | null> {
    const productToUpdate = await this.productRepository.findById(productId);

    if (!productToUpdate) throw new EntityNotFoundError('Product', productId);

    if (userId !== productToUpdate.ownerId) {
      throw new ForbiddenOperation('Only owner of the product can update this product');
    }

    const updatedProduct = await this.productRepository.updateOne(productId, query);

    return updatedProduct;
  }
}
