import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductModel } from '../models/product-models';

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

  async findOne({ id }: { id: string }): Promise<Product> {
    const mongoProduct = await ProductModel.findById(id);

    if (!mongoProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    return new Product({
      id: mongoProduct._id.toString(),
      name: mongoProduct.name,
      description: mongoProduct.description,
      createdAt: mongoProduct.createdAt,
    });
  }

  async updateOne({
    id,
    name,
    description,
  }: {
    id: string;
    name?: string;
    description?: string;
  }): Promise<Product> {
    const updateData: Partial<{ name: string; description: string }> = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    const mongoProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!mongoProduct) {
      throw new Error('Not found');
    }

    return new Product({
      id: mongoProduct._id.toString(),
      name: mongoProduct.name,
      description: mongoProduct.description,
      createdAt: mongoProduct.createdAt,
    });
  }

  async deleteOne({ id }: { id: string }): Promise<void> {
    const mongoProduct = await ProductModel.findByIdAndDelete(id);

    if (!mongoProduct) {
      throw new Error('Not found');
    }
  }
}
