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
