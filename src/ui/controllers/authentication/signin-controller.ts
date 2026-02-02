import { Request, Response } from 'express';
import { UserMongoRepository } from '@infrastructure/repositories/user-mongo-repository';
import { SecurityBcryptService } from '@infrastructure/services/security-bcrypt-service';
import { LoginUserUseCase } from '@domain/use-cases/user/login-user-usecase';

export const signinController = async (request: Request, response: Response): Promise<void> => {
  // !
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(400).json({
      content: 'email and description have to be dedfined',
    });
  }
  const userMongoRepository = new UserMongoRepository();
  const securityBcryptService = new SecurityBcryptService();

  const loginUserUseCase = new LoginUserUseCase(userMongoRepository, securityBcryptService);

  try {
    const { token } = await loginUserUseCase.execute({
      email: email as string,
      password: password as string,
    });
    response.json({ content: token });
  } catch (error) {
    response.status(400).json({
      content: 'Login error',
      error,
    });
  }
};
