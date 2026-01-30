import { faker } from '@faker-js/faker';
import { app } from '@ui/api';
import request from 'supertest';

describe('POST /authentication/signup', () => {
  const AUTHENTICATION_URL = '/authentication/signup';

  test('Email and password should be mandatory', async () => {
    const response = await request(app).post(AUTHENTICATION_URL).send({});

    expect(response.status).toBe(400);
  });
  test('Email should be unique', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const firstAttemptResponse = await request(app).post(AUTHENTICATION_URL).send({
      email,
      password,
    });

    expect(firstAttemptResponse.status).toBe(201);
    const SecondAttemptResponse = await request(app).post(AUTHENTICATION_URL).send({
      email,
      password,
    });
    expect(SecondAttemptResponse.status).toBe(409);
  });
  test('Given a valid email and password, a new user is created', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const response = await request(app).post(AUTHENTICATION_URL).send({
      email,
      password,
    });

    expect(response.status).toBe(201);
  });
});
