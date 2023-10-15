import supertest from 'supertest';
import app from '../app';
import {
  TEST_USERS,
  invalidUserRequests,
  userRequests,
} from '../__fixtures__/users';
import { ErrorMessages } from '../utils/constants';

const request = supertest(app);

const checkFindUserValidation = jest.fn();
const checkFindUser = jest.fn();

jest.mock('./users.json', () => {
  return JSON.stringify(TEST_USERS);
});

jest.mock('../middlewares/validator', () => {
  const originalModules = jest.requireActual('../middlewares/validator');
  return {
    __esModule: true,
    ...originalModules,
    validateFindRequest: (req, res, next) => {
      checkFindUserValidation(req.body);
      return originalModules.validateFindRequest(req, res, next);
    },
  };
});

jest.mock('./user', () => {
  const originalModules = jest.requireActual('./user');
  return {
    __esModule: true,
    ...originalModules,
    getUsers: (req, res, next) => {
      checkFindUser(req.body);
      return originalModules.getUsers(req, res, next);
    },
  };
});

jest.mock('../middlewares/delay', () => {
  const originalModules = jest.requireActual('../middlewares/delay');
  return {
    __esModule: true,
    ...originalModules,
    delay: (req, res, next) => next(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Find user request should', () => {
  it.each(userRequests)('$name', async ({ body, expected }) => {
    const response = await request.post('/').send(body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected);
  });
  it('return 404 if no users', async () => {
    const response = await request.post('/').send({ email: 'some@email.host' });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(ErrorMessages.usersNotFound);
  });
});

describe('Find user request validation', () => {
  it('should remove unexpected fields', async () => {
    const body = {
      email: 'some@email.com',
      unexpected: 'unexpected',
    };
    await request.post('/').send(body);
    expect(checkFindUserValidation).toBeCalledWith(
      expect.objectContaining(body)
    );
    expect(checkFindUser).toBeCalledWith(
      expect.not.objectContaining({ unxected: 'unexpected' })
    );
  });
  it.each(invalidUserRequests)(
    'should return Bad request error $name',
    async ({ data, expected }) => {
      const response = await request.post('/').send(data);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(expected);
    }
  );
});
