import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<div>Index</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render navigation links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<div>Index</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    expect(getByText('Application')).toBeTruthy();
    expect(getByText('Documentation')).toBeTruthy();
    expect(getByText('GitHub')).toBeTruthy();
  });
});
