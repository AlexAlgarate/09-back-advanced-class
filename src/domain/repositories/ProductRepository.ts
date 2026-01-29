import { Product } from '../entities/Product';

export interface ProductRepository {
  createOne({ name, description }: { name: string; description: string }): Promise<Product>;
  findMany(): Promise<Product[]>;
  findById({ id }: { id: string }): Promise<Product | null>;
  updateOne({
    id,
    name,
    description,
  }: {
    id: string;
    name?: string;
    description?: string;
  }): Promise<Product>;
  deleteOne({ id }: { id: string }): Promise<void>;
}
