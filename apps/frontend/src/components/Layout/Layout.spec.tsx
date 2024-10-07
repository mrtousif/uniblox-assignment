import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppLayout from './Layout'; // Adjust path as necessary
import { useRouter } from 'next/router';

// Mock the next/router hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('AppLayout Component', () => {
  beforeEach(() => {
    // Mock the router pathname before each test
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/',
    });
  });

  it('should render the layout with the "Home" menu item selected by default', () => {
    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>
    );

    // Check that the "Home" menu item is selected
    const homeMenuItem = screen.getByRole('menuitem', { name: /home/i });
    expect(homeMenuItem).toHaveClass('ant-menu-item-selected');

    // Ensure the content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should highlight the correct menu item based on the router pathname', () => {
    // Mock the router to simulate the "/orders" page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/orders',
    });

    render(
      <AppLayout>
        <div>Orders Content</div>
      </AppLayout>
    );

    // Check that the "Orders" menu item is selected
    const ordersMenuItem = screen.getByRole('menuitem', { name: /orders/i });
    expect(ordersMenuItem).toHaveClass('ant-menu-item-selected');
  });

  it('should update the selected menu item when a new one is clicked', () => {
    // Start on the home page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/',
    });

    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>
    );

    // Click on the "Cart" menu item
    const cartMenuItem = screen.getByRole('menuitem', { name: /cart/i });
    fireEvent.click(cartMenuItem);

    // Check that the "Cart" menu item is now selected
    expect(cartMenuItem).toHaveClass('ant-menu-item-selected');
  });
});
