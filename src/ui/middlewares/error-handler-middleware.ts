import { NextFunction, Request, Response } from 'express';
import { status } from 'http-status';
import * as z from 'zod';

import { DomainError } from '@domain/types/errors/DomainError';

const domainErrorToHttpStatusCode: Record<string, number> = {
  EntityNotFoundError: status.NOT_FOUND,
  UnauthorizatedError: status.UNAUTHORIZED,
  ForbiddenOperation: status.FORBIDDEN,
  BusinessConflictError: status.CONFLICT,
};

export const errorHandlerMiddleware = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  console.log(error.message);
  if (error instanceof DomainError) {
    const statusCode = domainErrorToHttpStatusCode[error.name] ?? status.INTERNAL_SERVER_ERROR;
    response.status(statusCode).json({ message: error.message });
  }

  if (error instanceof z.ZodError) {
    const errorMessage = z.flattenError(error).fieldErrors;
    response.status(status.BAD_REQUEST).json({ message: errorMessage });
  }

  // si no es error de dominio ni de validación de Zod, es un 500 no controlado
  response.status(status.INTERNAL_SERVER_ERROR).json({ message: JSON.stringify(error) });
};
