import { ProductRepository } from '@domain/repositories/ProductRepository';
import { ProductModel } from '../models/product-models';
import { Product } from '@domain/entities/Product';
import { ProductUpdateQuery } from '@domain/types/product/ProductUpdateQuery';

export class ProductMongodbRepository implements ProductRepository {
  async createOne({ name, description }: { name: string; description: string }): Promise<Product> {
    const newProduct = new ProductModel({
      name,
      description,
    });

    const createdProduct = await newProduct.save();
    return new Product({
      id: createdProduct._id.toString(),
      name: createdProduct.name,
      description: createdProduct.description,
      createdAt: createdProduct.createdAt,
    });
  }

  async findMany(): Promise<Product[]> {
    const mongoProducts = await ProductModel.find();

    return mongoProducts.map(
      mongoProduct =>
        new Product({
          id: mongoProduct._id.toString(),
          name: mongoProduct.name,
          description: mongoProduct.description,
          createdAt: mongoProduct.createdAt,
        })
    );
  }

  async findById(product_id: string): Promise<Product | null> {
    const mongoProduct = await ProductModel.findById(product_id);

    if (!mongoProduct) return null;

    return new Product({
      id: mongoProduct._id.toString(),
      name: mongoProduct.name,
      description: mongoProduct.description,
      createdAt: mongoProduct.createdAt,
    });
  }

  async updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null> {
    const updateData = await ProductModel.findByIdAndUpdate(productId, query, { new: true });

    if (!updateData) return null;

    return new Product({
      id: updateData._id.toString(),
      name: updateData.name,
      description: updateData.description,
      createdAt: updateData.createdAt,
    });
  }

  async deleteOne(product_id: string): Promise<void> {
    const mongoProduct = await ProductModel.findByIdAndDelete(product_id);

    if (!mongoProduct) {
      throw new Error('Not found');
    }
  }
}
