import { render } from '@testing-library/react';

import Discounts from './index';

describe('Discounts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Discounts />);
    expect(baseElement).toBeTruthy();
  });
});
