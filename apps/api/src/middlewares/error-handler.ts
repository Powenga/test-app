import { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from '../utils/constants';

interface IError extends Error {
  statusCode: number;
}

export const errorHandler = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = error;
  if (res.headersSent) {
    return next(error);
  }
  return res.status(statusCode).send({
    message: statusCode === 500 ? ErrorMessages.uncaught : message,
  });
};
