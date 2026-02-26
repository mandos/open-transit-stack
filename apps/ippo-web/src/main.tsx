import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './app/app';
import { ApplicationPage } from './components/application-page/application-page';
import { DocsContent } from './components/docs-content/docs-content';
import { DocumentationPage } from './components/documentation-page/documentation-page';
import { docs } from './docs';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<ApplicationPage />} />
          <Route path="docs" element={<DocumentationPage />}>
            <Route
              index
              element={<Navigate to={`/docs/${docs[0].slug}`} replace />}
            />
            <Route path=":slug" element={<DocsContent />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
