import { ProductRepository } from '@domain/repositories/ProductRepository';
import { ProductModel, ProductMongoDb } from '../models/product-models';
import { Product } from '@domain/entities/Product';
import { ProductUpdateQuery } from '@domain/types/product/ProductUpdateQuery';
import { ProductCreationQuery } from '@domain/types/product/ProductCreationQuery';

export class ProductMongodbRepository implements ProductRepository {
  async createOne({ name, description, userId }: ProductCreationQuery): Promise<Product> {
    const newProduct = new ProductModel({
      name,
      description,
      ownerId: userId,
    });

    const createdProduct = await newProduct.save();
    return this.restoreProduct(createdProduct);
  }

  async findMany(): Promise<Product[]> {
    const mongoProducts = await ProductModel.find();

    return mongoProducts.map(mongoProduct => this.restoreProduct(mongoProduct));
  }

  async findById(product_id: string): Promise<Product | null> {
    const mongoProduct = await ProductModel.findById(product_id);

    if (!mongoProduct) return null;

    return this.restoreProduct(mongoProduct);
  }

  async updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null> {
    const updateData = await ProductModel.findByIdAndUpdate(productId, query, { new: true });

    if (!updateData) return null;

    return this.restoreProduct(updateData);
  }

  async removeById(productId: string): Promise<boolean> {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    return !!deletedProduct;
  }

  private restoreProduct(productDb: ProductMongoDb): Product {
    return new Product({
      id: productDb._id.toString(),
      name: productDb.name,
      description: productDb.description,
      createdAt: productDb.createdAt,
      ownerId: productDb.ownerId.toString(),
    });
  }
}
