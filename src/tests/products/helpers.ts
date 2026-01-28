import request from 'supertest';
import { app } from '../../ui/api';
import { faker } from '@faker-js/faker';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRandomProduct = async () => {
  const response = await request(app).post('/products').send({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
  });

  return response;
};
