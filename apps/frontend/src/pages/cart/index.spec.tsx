import { render } from '@testing-library/react';

import Cart from './index';

describe('Cart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cart />);
    expect(baseElement).toBeTruthy();
  });
});
