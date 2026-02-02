import { User } from '@domain/entities/User';
import { SecurityService } from '@domain/services/SecurityService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class SecurityBcryptService implements SecurityService {
  private readonly jwtSecret = 'asdaljkskdfjlasdjfsmkd';

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async comparePasswords(incomingPassword: string, userPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(incomingPassword, userPassword);
    return isMatch;
  }
  generateJWT(user: User): string {
    // ! FIX TODO
    // eslint-disable-next-line import/no-named-as-default-member
    const token = jwt.sign(
      { userId: user.id },
      // clave secreta que tiene que ir en una variable de entorno
      this.jwtSecret,
      // Opciones varias
      { expiresIn: '1h' }
    );
    return token;
  }
}
