import request from 'supertest';
import { app } from '../../ui/api';
import { createRandomProduct } from './helpers';

describe('DELETE /products/:productId', () => {
  it('Should raise an error if product does not exist', async () => {
    const response = await request(app).delete(`/products/6979054b067bd17c70d31fbf`).send();

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Product not found' });
  });

  it('Should raise an error if product does not exist', async () => {
    const product = await createRandomProduct();

    const productId = (product.body as { content: { id: string } }).content.id;

    const response = await request(app).delete(`/products/${productId}`).send();

    expect(response.body).toEqual({ message: 'Product removed successfully' });
  });
});
