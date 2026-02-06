import { ProductRepository } from '@domain/repositories/ProductRepository';
import { UserRepository } from '@domain/repositories/UserRepository';
import { EmailService } from '@domain/services/EmailService';

export class SendProductReportUseCase {
  private readonly userRepository: UserRepository;
  private readonly productRepository: ProductRepository;
  private readonly emailService: EmailService;

  constructor(
    userRepository: UserRepository,
    productRepository: ProductRepository,
    emailService: EmailService
  ) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.emailService = emailService;
  }
  public async execute(): Promise<void> {
    // 1º Obtener todos los users de la plataforma
    const users = await this.userRepository.find();

    // 2º Obtener los productos de cada usuario
    for (const user of users) {
      const products = await this.productRepository.findMany({
        ownerId: user.id,
        page: 1,
        limit: 9999, // ! ProductModel.countDocuments({ ownerId: ownerId }) para obtener los productos de cada usuario
      });
      // 3º enviar un email con ese resumen
      const productsList = products
        .map(product => ` - ${product.name}: ${product.description}`)
        .join('\n');

      void this.emailService.sendEmail(
        user.email,
        `
          Hola, tienes publicados en la plataforma ${products.length} productos.
          ${productsList}
        `,
        'Resumen semanal'
      );
    }
  }
}
