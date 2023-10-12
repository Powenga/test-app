import { Request, Response, NextFunction, Router } from 'express';
import NotFoundError from '../utils/errors/not-found';
import { ErrorMessages } from '../utils/constants';

const router = Router();

router.get('/', (req, res) => {
  res.send({ message: 'Hello!' });
});

router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(ErrorMessages.routeNotFound));
});

export default router;
