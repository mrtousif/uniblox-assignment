import { render } from '@testing-library/react';

import DiscountForm from './DiscountForm';

describe('DiscountForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiscountForm />);
    expect(baseElement).toBeTruthy();
  });
});
