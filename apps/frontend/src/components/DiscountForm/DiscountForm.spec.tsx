import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DiscountForm from './DiscountForm';

describe('DiscountForm', () => {
  const mockOnFinish = jest.fn();

  beforeEach(() => {
    render(<DiscountForm onFinish={mockOnFinish} />);
  });

  it('renders the form with correct labels and input types', () => {
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Nth Order')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('input discount code')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('input amount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('input nth order')).toBeInTheDocument();
  });
});
