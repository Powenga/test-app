import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Form from './Form';
import '@testing-library/jest-dom';
import { EMAIL_MAX, ValidationMessages } from '@test-app/validation';
import { generateString } from '../../utils/test-utils';

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
});
