import { fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';
import '@testing-library/jest-dom';
import { EMAIL_MAX, ValidationMessages } from '@test-app/validation';
import { generateString } from '../../utils/test-utils';

describe('Form', () => {
  it('should render successfully', () => {
    render(<Form />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
  describe('email validation', () => {
    const setup = () => {
      render(<Form />);
      const initError = screen.queryByRole('alert');
      const nameInput = screen.getByLabelText('email');
      return { nameInput, initError };
    };
    it('should show required error', async () => {
      const { nameInput, initError } = setup();
      expect(initError).not.toBeInTheDocument();
      fireEvent.focus(nameInput);
      fireEvent.blur(nameInput);
      expect(await screen.findByRole('alert')).toHaveTextContent(
        ValidationMessages.emailRequired
      );
    });
    it('should show invalid error', async () => {
      const { nameInput, initError } = setup();
      expect(initError).not.toBeInTheDocument();
      fireEvent.change(nameInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(nameInput);
      expect(await screen.findByRole('alert')).toHaveTextContent(
        ValidationMessages.invalidEmail
      );
    });
    it('should show max error', async () => {
      const { nameInput, initError } = setup();
      expect(initError).not.toBeInTheDocument();
      fireEvent.change(nameInput, {
        target: {
          value: generateString({ length: EMAIL_MAX + 1, isEmail: true }),
        },
      });
      fireEvent.blur(nameInput);
      expect(await screen.findByRole('alert')).toHaveTextContent(
        ValidationMessages.emailMax
      );
    });
  });
  describe('number field', () => {
    const setup = () => {
      render(<Form />);
      const initError = screen.queryByRole('alert');
      const input = screen.getByLabelText('number');
      return { input, initError };
    };
    it('should show invalid error', async () => {
      const { input, initError } = setup();
      expect(initError).not.toBeInTheDocument();
      fireEvent.change(input, { target: { value: '1111' } });
      fireEvent.blur(input);
      expect(await screen.findByRole('alert')).toHaveTextContent(
        ValidationMessages.invalidNumber
      );
    });
    it('should add dashes', async () => {
      const { input, initError } = setup();
      expect(initError).not.toBeInTheDocument();
      fireEvent.change(input, { target: { value: '112233' } });
      fireEvent.blur(input);
      expect(input).toHaveValue('11-22-33');
    });
    it('should remove extra characters', async () => {
      const { input, initError } = setup();
      expect(initError).not.toBeInTheDocument();
      fireEvent.change(input, { target: { value: '11223344' } });
      fireEvent.blur(input);
      expect(input).toHaveValue('11-22-33');
    });
  });
});
