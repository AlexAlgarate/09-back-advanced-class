import { SecurityBcryptService } from '@infrastructure/services/security-bcrypt-service';
import { NextFunction, Request, Response } from 'express';

export const authenticationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authenticationHeader = request.headers.authorization; // --> Bearer 'token'
  const token = authenticationHeader?.split(' ')[1];
  if (!token) {
    response
      .status(401)
      .json({ message: 'Token not available. User not authorizated to use the platform.' });
    return;
  }
  // verificar si el token es de confianza
  const securityBcryptService = new SecurityBcryptService();
  try {
    const data = securityBcryptService.veryfyJWT(token);
    request.user = {
      id: data.userId,
    };
  } catch (error) {
    response
      .status(401)
      .json({ message: 'Token not available. User not authorizated to use the platform.', error });
    return;
  }

  next();
};
