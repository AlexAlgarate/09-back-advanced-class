import request from 'supertest';
import { app } from '../../ui/api';
import { createRandomProduct } from './helpers';
import { signupAndLogin } from '../authentication/helpers';

describe('DELETE /products/:productId', () => {
  it('Given no authorization header, endpoint should return a 401 status code', async () => {
    const response = await request(app)
      .delete('/products/6979054b067bd17c70d31fbf')
      .send({ name: 'test', description: 'test' });

    expect(response.status).toBe(401);
  });

  it('Given an invalid token, endpoint should return a 401 status code', async () => {
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    const response = await request(app)
      .delete('/products/6979054b067bd17c70d31fbf')
      .set('Authorization', invalidToken)
      .send({ name: 'test', description: 'test' });

    expect(response.status).toBe(401);
  });

  it('Should raise an error if product does not exist, return 400 status code', async () => {
    const token = await signupAndLogin();
    const response = await request(app)
      .delete(`/products/6979054b067bd17c70d31fbf`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Product not found' });
  });

  it('Given an existing product, delete it', async () => {
    const { response: product, token } = await createRandomProduct();

    const productId = (product.body as { content: { id: string } }).content.id;

    const response = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.body).toEqual({ message: 'Product removed successfully' });
  });

  // TODO review this test
  it('Given a not product owner, return a Forbidden operation errpr', async () => {
    const { response: product } = await createRandomProduct();
    const token = await signupAndLogin('other@email.com', 'Other-Password');

    const productId = (product.body as { content: { id: string } }).content.id;

    const response = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.body).toEqual({ message: 'Product not found' });
  });
});
