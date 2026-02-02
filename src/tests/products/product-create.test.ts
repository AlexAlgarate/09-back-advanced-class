import request from 'supertest';
import { app } from '../../ui/api';
import { signupAndLogin } from '../authentication/helpers';

describe('GET /products', () => {
  it('Given no authorization header, endpoint should return a 401 status code', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'test', description: 'test' });

    expect(response.status).toBe(401);
  });

  it('Given an invalid token, endpoint should return a 401 status code', async () => {
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    const response = await request(app)
      .post('/products')
      .set('Authorization', invalidToken)
      .send({ name: 'test', description: 'test' });

    expect(response.status).toBe(401);
  });

  it('Given no name or description, should return a 400 error', async () => {
    const productError = { name: 'test-error' };

    const token = await signupAndLogin();

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(productError);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: 'name and description have to be dedfined' });
  });

  it('Product should be created (201)', async () => {
    const token = await signupAndLogin();
    const product = { name: 'test', description: 'test' };

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      content: { name: 'test', description: 'test' },
    });
    expect((response.body as { content: { createdAt: Date } }).content.createdAt).toBeDefined();
  });
});
