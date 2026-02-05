import { ProductCreationQuery } from '@domain/types/product/ProductCreationQuery';
import { Product } from '../entities/Product';
import { ProductUpdateQuery } from '../types/product/ProductUpdateQuery';
import { ProductFindQuery } from '@domain/types/product/ProductFindQuery';

export interface ProductRepository {
  createOne({ name, description }: ProductCreationQuery): Promise<Product>;
  findMany(query: ProductFindQuery): Promise<Product[]>;
  findById(productId: string): Promise<Product | null>;
  updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null>;
  removeById(productId: string): Promise<boolean>;
}
