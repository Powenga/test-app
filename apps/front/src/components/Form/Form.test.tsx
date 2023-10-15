import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Form from './Form';
import '@testing-library/jest-dom';
import { EMAIL_MAX, ValidationMessages } from '@test-app/validation';
import { generateString } from '../../utils/test-utils';
import { transformNumberField } from '../../utils';

const users = [
  {
    email: 'email1@test.com',
    number: '111111',
  },
  {
    email: 'email2@test.com',
    number: '222222',
  },
];

const URL = 'http://localhost:3000/';

const handlers = [
  rest.post(URL, async (req, res, ctx) => {
    return res(ctx.json(users), ctx.delay(100));
  }),
];

const server = setupServer(...handlers);

describe('Form', () => {
  beforeEach(() => {
    render(<Form />);
  });

  const setup = () => {
    const emailInput = screen.getByLabelText('email');
    const numberInput = screen.getByLabelText('number');
    return { emailInput, numberInput };
  };

  it('should be rendering successfully', () => {
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
  describe('email validation', () => {
    it('should show required error', async () => {
      const { emailInput } = setup();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);
      expect(await screen.findByRole('alert')).toHaveTextContent(
        ValidationMessages.emailRequired
      );
    });
    it('should show invalid error', async () => {
      const { emailInput } = setup();
      expect(await screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);
      expect(await screen.findByRole('alert')).toHaveTextContent(
        ValidationMessages.invalidEmail
      );
    });
    it('should show max error', async () => {
      const { emailInput } = setup();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      fireEvent.change(emailInput, {
        target: {
          value: generateString({ length: EMAIL_MAX + 1, isEmail: true }),
        },
      });
      fireEvent.blur(emailInput);
      expect(await screen.findByRole('alert')).toHaveTextContent(
        ValidationMessages.emailMax
      );
    });
  });
  describe('number field', () => {
    it('should show invalid error', async () => {
      const { numberInput } = setup();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      fireEvent.change(numberInput, { target: { value: '1111' } });
      fireEvent.blur(numberInput);
      expect(await screen.findByRole('alert')).toHaveTextContent(
        ValidationMessages.invalidNumber
      );
    });
    it('should add dashes', async () => {
      const { numberInput } = setup();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      fireEvent.change(numberInput, { target: { value: '112233' } });
      fireEvent.blur(numberInput);
      await waitFor(() => {
        expect(numberInput).toHaveValue('11-22-33');
      });
    });
    it('should remove extra characters', async () => {
      const { numberInput } = setup();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      fireEvent.change(numberInput, { target: { value: '11223344' } });
      fireEvent.blur(numberInput);
      await waitFor(() => {
        expect(numberInput).toHaveValue('11-22-33');
      });
    });
  });
  describe('should process data', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should send request and show user list', async () => {
      const { emailInput } = setup();
      fireEvent.change(emailInput, { target: { value: 'some@test.com' } });
      const button = screen.getByRole('button', { name: 'Search' });
      await waitFor(() => {
        expect(button).not.toBeDisabled();
      });
      fireEvent.click(button);
      await waitFor(() => {
        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(users.length);
        const itemContent = items.map((item) => item.textContent);
        expect(itemContent).toEqual(
          users.map(
            ({ email, number }) =>
              `Email: ${email}, number: ${transformNumberField(number)}`
          )
        );
      });
    });

    it('should show 404 error', async () => {
      const USER_NOT_FOUND_MESSAGE = 'Users not found!';
      server.use(
        rest.post(URL, (req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({ message: USER_NOT_FOUND_MESSAGE }),
            ctx.delay(100)
          );
        })
      );
      const { emailInput } = setup();
      fireEvent.change(emailInput, { target: { value: 'some@test.com' } });
      const button = screen.getByRole('button', { name: 'Search' });
      await waitFor(() => {
        expect(button).not.toBeDisabled();
      });
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          USER_NOT_FOUND_MESSAGE
        );
      });
    });

    it('should show uncaught error message', async () => {
      const MESSAGE = 'Something went wrong!';
      server.use(
        rest.post(URL, (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({ message: MESSAGE }),
            ctx.delay(100)
          );
        })
      );
      const { emailInput } = setup();
      fireEvent.change(emailInput, { target: { value: 'some@test.com' } });
      const button = screen.getByRole('button', { name: 'Search' });
      await waitFor(() => {
        expect(button).not.toBeDisabled();
      });
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          MESSAGE
        );
      });
    });
  });
});
