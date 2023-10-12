import { Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { ITypedRequest, IUser, IUserRequst } from '@test-app/types';
import NotFoundError from '../utils/errors/not-found';
import { ErrorMessages } from '../utils/constants';

const FILE_NAME = 'users.json';
const FILE_ENCODING = 'utf8';
const FILE_PATH = path.join(__dirname, FILE_NAME);

export async function getUsers(
  req: ITypedRequest<never, IUserRequst, never>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, number } = req.body;
    const usersFromFile = await fs.readFile(FILE_PATH, FILE_ENCODING);
    const users: IUser[] = JSON.parse(usersFromFile);

    const findedUsers = users.filter((user) => {
      if (number) {
        return user.email === email && user.number === number;
      }
      return user.email === email;
    });

    if (!findedUsers.length) {
      throw new NotFoundError(ErrorMessages.usersNotFound);
    }

    res.send(findedUsers);
  } catch (error) {
    next(error);
  }
}
