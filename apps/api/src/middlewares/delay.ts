import { ITypedRequest, IUserRequst } from '@test-app/types';
import { Response, NextFunction } from 'express';
import { DELAY } from '../config';

export async function delay(
  req: ITypedRequest<never, IUserRequst, never>,
  res: Response,
  next: NextFunction
) {
  setTimeout(() => {
    next();
  }, Number(DELAY));
}
