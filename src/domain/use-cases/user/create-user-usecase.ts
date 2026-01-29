import { User } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';
import { SecurityService } from '@domain/services/SecurityService';
import { UserCreationQuery } from '@domain/types/user/UserCreationQuery';

export class CreateUserUseCase {
  readonly userRepository: UserRepository;
  readonly securityService: SecurityService;

  constructor(userRepository: UserRepository, securityService: SecurityService) {
    this.userRepository = userRepository;
    this.securityService = securityService;
  }
  async execute(query: UserCreationQuery): Promise<User> {
    // 1º Comprobar email no existe antes de crearlo
    const user = await this.userRepository.findByEmail(query.email);

    if (user) {
      throw new Error('The user already exists');
    }
    // 2º Ordenar que se hasheé la password

    const hashedPassword = this.securityService.hashPassword(query.password);
    // 3º Crear el usuario
    const createdUser = await this.userRepository.createOne({
      email: query.email,
      password: hashedPassword,
    });

    return createdUser;
  }
}
