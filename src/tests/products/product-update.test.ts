import request from 'supertest';
import { app } from '../../api';

describe('PATCH /products/:productId', () => {
  it('Should return a 400 if product does not exist', async () => {
    const response = await request(app).patch(`/products/${'6979054b067bd17c70d31fbf'}`).send({
      name: 'updated-name',
      description: 'updated-description',
    });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: 'Not found' });
  });
  it('Should return a updated product', async () => {
    const product = await request(app).post('/products').send({
      name: 'test',
      description: 'test',
    });

    const productId = product.body.content._id;

    const response = await request(app).patch(`/products/${productId}`).send({
      name: 'updated-name',
      description: 'updated-description',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      content: {
        name: 'updated-name',
        description: 'updated-description',
        __v: 0,
      },
    });
  });
});
