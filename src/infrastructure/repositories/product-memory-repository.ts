import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class ProductMemoryRepository implements ProductRepository {
  readonly products: Product[];

  constructor() {
    this.products = [];
  }
  findMany(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  findById(): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  updateOne(): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  removeById(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  createOne({ name, description }: { name: string; description: string }): Promise<Product> {
    const product = new Product({
      name,
      description,
      createdAt: new Date(),
      id: Date.now.toString(),
    });

    this.products.push(product);

    return Promise.resolve(product);
  }
}
