# Architecture

## Tech Stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 19 + TypeScript 5.9          |
| Build       | Vite 7 with SWC, managed by Nx 22  |
| Mapping     | MapLibre GL via @mapcomponents/react-maplibre |
| Routing     | React Router 6 (nested routes)     |
| Testing     | Vitest + React Testing Library      |
| E2E         | Playwright                          |
| Deploy      | S3 + CloudFront (via ippo-infra)   |

## Layout Pattern

The app uses React Router nested routes with a shared shell layout:

```
App (Header + Outlet)
  |- ApplicationPage (Sidebar + MapView)
  |- DocumentationPage (DocsSidebar + Outlet)
       |- DocsContent (rendered markdown)
```

- **App** renders the top navigation header and an `<Outlet />` for page content.
- **ApplicationPage** is the main map view with a sidebar for options.
- **DocumentationPage** is a layout route with a docs sidebar and nested content.

## Styling

- **CSS Modules** (`.module.css`) for component-scoped styles
- **Global styles** in `src/styles.css` for html/body/root sizing and MapLibre container
- No CSS-in-JS or utility frameworks

## Map Integration

The map uses [@mapcomponents/react-maplibre](https://mapcomponents.github.io/react-map-components-maplibre/) which wraps MapLibre GL JS. Key details:

- `MapLibreMap` manages its own container div (class `mapContainer`)
- The map instance is accessed via the `useMap()` hook
- Default center: Asahikawa, Japan (141.352, 43.068)
