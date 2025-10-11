# vue-vite

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e --project=chromium
# Runs the tests of a specific file
pnpm test:e2e tests/example.spec.ts
# Runs the tests in debug mode
pnpm test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Deployment

### Cloudflare Pages

This project is configured to deploy on Cloudflare Pages.

#### Setup

1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   - **Root directory**: `apps/vue-vite` (if using monorepo)
3. Set up environment variables in the Cloudflare Pages dashboard:
   - `VITE_APP_API_URL`: Your API endpoint URL
   - `VITE_APP_ENABLE_API_MOCKING`: `false` for production

#### Preview Deployments

- **Production branch**: Deployments from `main` or `renewal` branch go to production
- **Preview deployments**: All pull requests automatically get preview deployments
- Each preview deployment gets a unique URL for testing

#### Configuration Files

- `wrangler.toml`: Cloudflare Pages configuration
- `public/_headers`: Security and caching headers
- `public/_redirects`: SPA routing configuration
