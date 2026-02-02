import request from 'supertest';
import { app } from '../../ui/api';
import { faker } from '@faker-js/faker';
import { signupAndLogin } from '../authentication/helpers';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRandomProduct = async () => {
  const token = await signupAndLogin();
  const response = await request(app)
    .post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
    });

  return { response, token };
};
