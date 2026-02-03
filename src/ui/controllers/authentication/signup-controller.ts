import { Request, Response } from 'express';

import { CreateUserUseCase } from '@domain/use-cases/user/create-user-usecase';
import { authenticationBodySchema } from '@ui/validators/authentication-validators';
import { AuthenticationFactory } from '@ui/factories/authentication-factory';
import { ZodError } from 'zod';

export const signupController = async (request: Request, response: Response): Promise<void> => {
  try {
    const { email, password } = authenticationBodySchema.parse(request.body);

    const { userRepository, securityService } = AuthenticationFactory.createDependencies();

    const createUserUseCase = new CreateUserUseCase(userRepository, securityService);

    await createUserUseCase.execute({
      email: email,
      password: password,
    });
    response.status(201).json({ content: 'User created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({ content: 'Validation Error', errors: error.message });
      return;
    }
    response.status(409).json({
      content: 'The user already exists',
    });
  }
};
