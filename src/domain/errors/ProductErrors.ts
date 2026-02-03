export class ProductNotFoundError extends Error {
  constructor(message = 'Product not found') {
    super(message);
    this.name = 'ProductNotFoundError';
  }
}

export class ForbiddenOperationError extends Error {
  constructor(message = 'Forbidden operation') {
    super(message);
    this.name = 'ForbiddenOperationError';
  }
}
