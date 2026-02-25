import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app/app';
import { ApplicationPage } from './components/application-page/application-page';
import { DocumentationPage } from './components/documentation-page/documentation-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<ApplicationPage />} />
          <Route path="docs" element={<DocumentationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
