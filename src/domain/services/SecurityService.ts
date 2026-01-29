export interface SecurityService {
  hashPassword(password: string): string;
}
