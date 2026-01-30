import { CreateUserUseCase } from '@domain/use-cases/user/create-user-usecase';
import { UserMongoRepository } from '@infrastructure/repositories/user-mongo-repository';
import { SecurityBcryptService } from '@infrastructure/services/security-bcrypt-service';
import { Request, Response } from 'express';

export const signupController = async (request: Request, response: Response): Promise<void> => {
  // !
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(400).json({
      message: 'email and description have to be dedfined',
    });
  }
  const userMongoRepository = new UserMongoRepository();
  const securityBcryptService = new SecurityBcryptService();

  const createUserUseCase = new CreateUserUseCase(userMongoRepository, securityBcryptService);

  try {
    await createUserUseCase.execute({
      email: email as string,
      password: password as string,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    response.status(409).json({
      content: 'The user already exists',
    });
  }

  response.status(201).json({ content: 'User created successfully' });
};
