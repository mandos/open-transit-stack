# Open Transit Stack

A monorepo for processing, validating, and visualizing public transit data using the [GTFS](https://gtfs.org/) (General Transit Feed Specification) standard.

> **Note:** This project is still in its early days and is more of a proof of concept than anything production-ready. There are rough edges, known bugs, and plenty of shortcuts — and the APIs, structure, and features may change significantly as things evolve.

> The project has two equal goals: exploring the TypeScript/JavaScript ecosystem, Pulumi infrastructure-as-code, and the NX monorepo tooling — and eventually becoming production-ready. As a deliberate choice, some features are implemented from scratch within the monorepo instead of relying on well-tested third-party libraries, even when those implementations are barebone. The CSV parser (`@mandos-dev/csv`) is one such example.

## Project Structure

### Apps

| App | Description |
|-----|-------------|
| [ippo-web](apps/ippo-web) | React web app with MapLibre GL for transit data visualization |
| [ippo-cli](apps/ippo-cli) | CLI tool for GTFS data processing |
| [ippo-infra](apps/ippo-infra) | AWS infrastructure (Pulumi) - S3, CloudFront, ACM, DNS |
| [ippo-web-e2e](apps/ippo-web-e2e) | End-to-end tests (Playwright) |

### Libraries

| Library | Description |
|---------|-------------|
| `@mandos-dev/gtfs-core` | GTFS type definitions and specifications |
| `@mandos-dev/gtfs-parser` | GTFS file parsing |
| `@mandos-dev/gtfs-query` | GTFS data querying |
| `@mandos-dev/gtfs-validate` | GTFS data validation |
| `@mandos-dev/gtfs-io` | GTFS input/output operations |
| `@mandos-dev/csv` | CSV parsing utilities |

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Monorepo:** Nx 22 + npm workspaces
- **Frontend:** React 19, Vite 7, MapLibre GL
- **Infrastructure:** Pulumi, AWS (S3, CloudFront, ACM, IAM), Cloudflare
- **Testing:** Vitest, Playwright
- **Linting:** ESLint 9, Prettier

## Getting Started

```bash
# Install dependencies
npm install

# Run the web app
npx nx serve ippo-web

# Build
npx nx build ippo-web

# Run tests
npx nx test ippo-web

# Visualize project graph
npx nx graph
```

## License

Apache 2.0 - see [LICENSE](LICENSE)
