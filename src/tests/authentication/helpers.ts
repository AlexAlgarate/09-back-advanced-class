import { app } from '@ui/api';
import request from 'supertest';

export const signupAndLogin = async (
  email: string = 'example@example.com',
  password: string = '1234'
): Promise<string> => {
  await request(app).post('/authentication/signup').send({ email, password });

  const loginResponse = await request(app).post('/authentication/signin').send({ email, password });

  return loginResponse.body.content as string;
};
