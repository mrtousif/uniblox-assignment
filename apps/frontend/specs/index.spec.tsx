import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index, { getStaticProps } from '../src/pages/index'; // Adjust the path as necessary
import { API_URL } from '../src/contants';
import { useRouter } from 'next/router';

// Mock the next/router hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn();

describe('Index Page', () => {
  const products = [
    { id: '1', name: 'Product 1', stockQty: 10, price: 100 },
    { id: '2', name: 'Product 2', stockQty: 5, price: 200 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the AppLayout and Home components with products', () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/',
    });
    render(<Index products={products} />);

    // Check if AppLayout is rendered
    const layoutElement = screen.getByRole('menu'); // Assuming there's a menu inside AppLayout
    expect(layoutElement).toBeInTheDocument();

    // Check if Home component is rendered with products
    const product1 = screen.getByText('Product 1');
    const product2 = screen.getByText('Product 2');
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });

  it('getStaticProps fetches products correctly', async () => {
    // Mock the fetch call to return products
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(products),
    });

    const context = {}; // Dummy context for getStaticProps
    const result = await getStaticProps(context as any);

    // Check if getStaticProps returned the products correctly
    expect(result).toEqual({
      props: { products },
    });

    // Ensure fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(API_URL + '/products');
  });

  it('getStaticProps handles fetch errors gracefully', async () => {
    // Mock fetch to throw an error
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch products')
    );

    const context = {}; // Dummy context for getStaticProps
    const result = await getStaticProps(context as any);

    // Check if getStaticProps returned an empty products array on error
    expect(result).toEqual({
      props: { products: [] },
    });

    // Ensure fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(API_URL + '/products');
  });
});
