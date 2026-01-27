import request from 'supertest';
import { app } from '../../api';

describe('GET /products', () => {
  const _ID_MONGO = '6979054b067bd17c70d31fbf';

  it('Should return a 404 if a product does not exist', async () => {
    const response = await request(app).get(`/products/${_ID_MONGO}`).send();

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ error: 'Product Not Found' });
  });
  it('Should return the requests product', () => {});
});
