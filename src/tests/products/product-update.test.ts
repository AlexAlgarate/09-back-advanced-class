import request from 'supertest';
import { app } from '../../ui/api';
import { createRandomProduct } from './helpers';
import { signupAndLogin } from '../authentication/helpers';

describe('PATCH /products/:productId', () => {
  it('Given no authorization header, endpoint should return a 401 status code', async () => {
    const response = await request(app)
      .patch('/products/6979054b067bd17c70d31fbf')
      .send({ name: 'test', description: 'test' });

    expect(response.status).toBe(401);
  });

  it('Given an invalid token, endpoint should return a 401 status code', async () => {
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    const response = await request(app)
      .patch('/products/6979054b067bd17c70d31fbf')
      .set('Authorization', invalidToken)
      .send({ name: 'test', description: 'test' });

    expect(response.status).toBe(401);
  });

  it('GIven a non existing product, return a 404 status code', async () => {
    const token = await signupAndLogin();

    const response = await request(app)
      .patch(`/products/${'6979054b067bd17c70d31fbf'}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'Product not found' });
  });

  it('Given an existing product, return 200 status code and updated product', async () => {
    const { newRandomProduct, token } = await createRandomProduct();

    const productId = (newRandomProduct.body as { content: { id: string } }).content.id;

    const response = await request(app)
      .patch(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'updated-name',
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      content: {
        name: 'updated-name',
        description: (newRandomProduct.body as { content: { description: string } }).content
          .description,
      },
    });
  });

  it('Given a user that is not the product owner, return a Forbidden operation error', async () => {
    const { newRandomProduct } = await createRandomProduct();
    const token = await signupAndLogin('other@email.com', 'Other-Password');

    const productId = (newRandomProduct.body as { content: { id: string } }).content.id;

    const response = await request(app)
      .patch(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    // TODO: cambiar a 403
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'Product not found' });
  });
});
