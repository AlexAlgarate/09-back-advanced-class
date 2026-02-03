import { ProductMongodbRepository } from '@infrastructure/repositories/product-mongo-repository';

export class ProductFactory {
  static createRepository(): ProductMongodbRepository {
    return new ProductMongodbRepository();
  }
}
