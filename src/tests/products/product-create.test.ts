import request from 'supertest';
import { app } from '../../ui/api';

describe('GET /products', () => {
  it('Given no name or description, should return a 400 error', async () => {
    const productError = { name: 'test-error' };

    const response = await request(app).post('/products').send(productError);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: 'name and description have to be dedfined' });
  });
  it('Product should be created (201)', async () => {
    const product = { name: 'test', description: 'test' };

    const response = await request(app).post('/products').send(product);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      content: { name: 'test', description: 'test' },
    });
    expect(response.body.content.createdAt).toBeDefined();
  });
});
