import { Router } from 'express';
import NotFoundError from '../utils/errors/not-found';
import { ErrorMessages } from '../utils/constants';
import { getUsers } from '../controllers/user';
import { delay } from '../middlewares/delay';
import { validateFindRequest } from '../middlewares/validator';

const router = Router();

router.post('/', validateFindRequest, delay, getUsers);

router.use('*', (req, res, next) => {
  next(new NotFoundError(ErrorMessages.routeNotFound));
});

export default router;
