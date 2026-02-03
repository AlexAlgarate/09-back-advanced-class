import request from 'supertest';
import { app } from '../../ui/api';
import { createRandomProduct } from './helpers';

describe('GET /products/:productId - 404 cases', () => {
  const _ID_MONGO = '6979054b067bd17c70d31fbf';

  it('Should return a 404 if a product does not exist', async () => {
    const response = await request(app).get(`/products/${_ID_MONGO}`).send();

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ error: 'Product Not Found' });
  });
  it('Should return the requests product', async () => {
    const { newRandomProduct: product } = await createRandomProduct();

    const productId = (product.body as { content: { id: string } }).content.id;

    const response = await request(app).get(`/products/${productId}`).send();

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      content: {
        name: (product.body as { content: { name: string } }).content.name,
        description: (product.body as { content: { description: string } }).content.description,
      },
    });
  });
});

describe('GET /products', () => {
  it('Should return an empty array when there are no products', async () => {
    const response = await request(app).get('/products').send();

    expect((response.body as { content: unknown[] }).content.length).toBe(0);
  });

  it('Should return a list of products', async () => {
    await createRandomProduct();
    await createRandomProduct();

    const response = await request(app).get('/products').send();

    expect((response.body as { content: unknown[] }).content.length).toBe(2);
  });
});
