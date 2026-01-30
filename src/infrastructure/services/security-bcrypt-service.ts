import { SecurityService } from '@domain/services/SecurityService';
import bcrypt from 'bcryptjs';

export class SecurityBcryptService implements SecurityService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
