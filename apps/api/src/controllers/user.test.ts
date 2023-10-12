import supertest from 'supertest';
import app from '../app';
import { TEST_USERS, userRequests } from '../__fixtures__/users';
import { ErrorMessages } from '../utils/constants';

const request = supertest(app);

jest.mock('./users.json', () => {
  return JSON.stringify(TEST_USERS);
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
