import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard'; // Adjust the import path as necessary

describe('ProductCard', () => {
  const product = {
    id: '1',
    stockQty: 1,
    name: 'Test Product',
    price: 100,
  };

  const handleClickMock = jest.fn();

  it('should render product name and price', () => {
    render(<ProductCard product={product} handleClick={handleClickMock} />);

    // Check if the product name is displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();

    // Check if the product price is displayed
    expect(screen.getByText('Price: 100')).toBeInTheDocument();
  });

  it('should call handleClick when Add to cart button is clicked', () => {
    render(<ProductCard product={product} handleClick={handleClickMock} />);

    // Find the Add to cart button
    const addToCartButton = screen.getByText('Add to cart');

    // Simulate clicking the button
    fireEvent.click(addToCartButton);

    // Check if handleClick was called with the correct product
    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(product);
  });

  it('should display the Add to cart button', () => {
    render(<ProductCard product={product} handleClick={handleClickMock} />);

    // Check if the Add to cart button is displayed
    expect(screen.getByText('Add to cart')).toBeInTheDocument();
  });
});
