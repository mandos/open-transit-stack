# Contributing

## Development Workflow

1. Create a feature branch from `master`
2. Make changes and verify locally with `npx nx serve ippo-web`
3. Run checks before pushing:
   ```bash
   npx nx lint ippo-web
   npx nx typecheck ippo-web
   npx nx test ippo-web
   npx nx build ippo-web
   ```
4. Open a pull request

## Code Style

- **TypeScript strict mode** is enforced (`noUnusedLocals`, `noImplicitReturns`, `noFallthroughCasesInSwitch`)
- **ESLint 9** flat config with Nx React preset
- **Prettier** for formatting
- Named exports for components (no default exports, except `app.tsx`)

## Component Conventions

Each component lives in its own directory under `src/components/`:

```
src/components/my-component/
  my-component.tsx           # Component implementation
  my-component.module.css    # Scoped styles (CSS Modules)
  my-component.spec.tsx      # Unit tests (co-located)
```

## Adding a New Documentation Page

1. Create a new `.md` file in `apps/ippo-web/docs/`
2. Add an import and entry to `src/docs/index.ts`:
   ```typescript
   import newDoc from '../../docs/new-doc.md?raw';

   // Add to the docs array:
   { slug: 'new-doc', title: 'New Doc', order: 4, content: newDoc },
   ```
3. The page automatically appears in the sidebar at `/docs/new-doc`
