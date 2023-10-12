import { Request, Response, NextFunction, Router } from 'express';
import NotFoundError from '../utils/errors/not-found';
import { ErrorMessages } from '../utils/constants';
import { getUsers } from '../controllers/user';

const router = Router();

router.post('/', getUsers);

router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(ErrorMessages.routeNotFound));
});

export default router;
