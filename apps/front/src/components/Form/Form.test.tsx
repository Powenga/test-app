import { render, screen } from '@testing-library/react';
import Form from './Form';
import '@testing-library/jest-dom';

describe('From', () => {
  it('should render succesfully', async () => {
    render(<Form />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});
