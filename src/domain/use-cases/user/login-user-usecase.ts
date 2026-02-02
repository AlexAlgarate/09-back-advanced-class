import { UserRepository } from '@domain/repositories/UserRepository';
import { SecurityService } from '@domain/services/SecurityService';

export class LoginUserUseCase {
  private readonly userRepository: UserRepository;
  private readonly securityService: SecurityService;

  constructor(userRepository: UserRepository, securityService: SecurityService) {
    this.userRepository = userRepository;
    this.securityService = securityService;
  }

  async execute({ email, password }: { email: string; password: string }): Promise<{
    token: string;
  }> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) {
      throw new Error('User does not exist');
    }

    // comparar las contraseñas
    const arePasswordEqual = await this.securityService.comparePasswords(
      password,
      existingUser.password
    );
    if (arePasswordEqual) {
      // generar el jwt
      const token = this.securityService.generateJWT(existingUser);
      return { token };
    } else {
      throw new Error('Wrong password');
    }
  }
}
