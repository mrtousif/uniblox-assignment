import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Home, Product } from './Home';

// Mock the ProductCard component
jest.mock('../ProductCard/ProductCard', () => ({
  __esModule: true,
  default: ({
    product,
    handleClick,
  }: {
    product: Product;
    handleClick: (product: Product) => void;
  }) => (
    <div data-testid={`product-card-${product.id}`}>
      <p>{product.name}</p>
      <button
        data-testid={`add-to-cart-${product.id}`}
        onClick={() => handleClick(product)}
      >
        Add to cart
      </button>
    </div>
  ),
}));

// Mock the notification API from antd
jest.mock('antd', () => {
  const originalModule = jest.requireActual('antd');
  return {
    ...originalModule,
    notification: {
      useNotification: () => [
        {
          success: jest.fn(),
          error: jest.fn(),
        },
        <div key="notification-context" />,
      ],
    },
  };
});

describe('Home Component', () => {
  const products: Product[] = [
    { id: '1', name: 'Product 1', stockQty: 10, price: 100 },
    { id: '2', name: 'Product 2', stockQty: 5, price: 200 },
  ];

  it('should render a list of ProductCards', () => {
    render(<Home products={products} />);

    // Check if product cards are rendered using data-testid
    const productCards = screen.getAllByTestId(/product-card-/);
    expect(productCards).toHaveLength(2);

    // Ensure the product names are displayed
    expect(productCards[0]).toHaveTextContent('Product 1');
    expect(productCards[1]).toHaveTextContent('Product 2');
  });
});
