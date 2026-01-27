import request from 'supertest';
import { app } from '../../api';

describe('DELETE /products/:productId', () => {
  it('Should raise an error if product does not exist', async () => {
    const response = await request(app).delete(`/products/6979054b067bd17c70d31fbf`).send();

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Not found' });
  });

  it('Should raise an error if product does not exist', async () => {
    const product = await request(app)
      .post('/products')
      .send({ name: 'test', description: 'test' });

    const productId = product.body.content._id;

    const response = await request(app).delete(`/products/${productId}`).send();

    expect(response.body).toEqual({ message: 'Product removed successfully' });
  });
});
