import request from 'supertest';
import { app } from '../../api';

describe('GET /products/:productId', () => {
  const _ID_MONGO = '6979054b067bd17c70d31fbf';

  it('Should return a 404 if a product does not exist', async () => {
    const response = await request(app).get(`/products/${_ID_MONGO}`).send();

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ error: 'Product Not Found' });
  });
  it('Should return the requests product', async () => {
    const product = await request(app).post('/products').send({
      name: 'test',
      description: 'test',
    });

    const productId = product.body.content._id;

    const response = await request(app).get(`/products/${productId}`).send();

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      content: {
        name: 'test',
        description: 'test',
        __v: 0,
      },
    });
  });
});
