import { ProductCreationQuery } from '@domain/types/product/ProductCreationQuery';
import { Product } from '../entities/Product';
import { ProductUpdateQuery } from '../types/product/ProductUpdateQuery';
import { Pagination } from '@domain/types/pagination';

export interface ProductRepository {
  createOne({ name, description }: ProductCreationQuery): Promise<Product>;
  findMany({ page, limit }: Pagination): Promise<Product[]>;
  findById(productId: string): Promise<Product | null>;
  updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null>;
  removeById(productId: string): Promise<boolean>;
}
