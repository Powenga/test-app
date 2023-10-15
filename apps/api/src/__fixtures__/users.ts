import { EMAIL_MAX, ValidationMessages } from '@test-app/validation';

const VALID_EMAIL = 'email@host.com';

export function generateString({
  length,
  isEmail = false,
}: {
  length: number;
  isEmail?: boolean;
}) {
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  if (isEmail) {
    result += '@mail.host';
  }
  return result;
}

export const TEST_USERS = [
  { email: 'jill@gmail.com', number: '822287' },
  { email: 'jill@gmail.com', number: '822286' },
];

export const userRequests = [
  {
    name: 'find one user with both parameters',
    body: { email: TEST_USERS[0].email, number: TEST_USERS[0].number },
    expected: [TEST_USERS[0]],
  },
  {
    name: 'find all users with the same email',
    body: { email: TEST_USERS[0].email },
    expected: [TEST_USERS[0], TEST_USERS[1]],
  },
];

export const invalidUserRequests = [
  { name: 'with no data', expected: ValidationMessages.emailRequired },
  {
    name: 'with invalid email',
    data: { email: 'invalid' },
    expected: ValidationMessages.invalidEmail,
  },
  {
    name: 'with non-string email',
    data: { email: {} },
    expected: ValidationMessages.stringRequired,
  },
  {
    name: 'with too big email',
    data: { email: generateString({ length: EMAIL_MAX + 1, isEmail: true }) },
    expected: ValidationMessages.emailMax,
  },
  {
    name: 'with non-string number field',
    data: { email: VALID_EMAIL, number: {} },
    expected: ValidationMessages.stringRequired,
  },
  {
    name: 'with invalid number',
    data: { email: VALID_EMAIL, number: '1' },
    expected: ValidationMessages.invalidNumber,
  },
];
