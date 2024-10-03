import { render } from '@testing-library/react';

import Layout from './Layout';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Layout>
        <div></div>
      </Layout>
    );
    expect(baseElement).toBeTruthy();
  });
});
