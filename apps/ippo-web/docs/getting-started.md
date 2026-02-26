# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- [Nx CLI](https://nx.dev/) (included via `npx`)

## Running the App

From the monorepo root:

```bash
npx nx serve ippo-web
```

The dev server starts on [http://localhost:4200](http://localhost:4200).

## Building for Production

```bash
npx nx build ippo-web
```

Output is written to `apps/ippo-web/dist/`.

## Project Structure

```
apps/ippo-web/
  docs/               # Markdown documentation (rendered at /docs)
  src/
    main.tsx          # Entry point with routing
    styles.css        # Global styles
    app/              # Shell layout (Header + Outlet)
    components/       # Feature components
    docs/             # Docs manifest (imports markdown files)
```

## Running Tests

```bash
npx nx test ippo-web      # Unit tests (Vitest)
npx nx e2e ippo-web-e2e   # E2E tests (Playwright)
```

## Linting and Type Checking

```bash
npx nx lint ippo-web       # ESLint
npx nx typecheck ippo-web  # TypeScript
```
