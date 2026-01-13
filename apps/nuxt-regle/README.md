# Nuxt Regle Application

A full-stack application using Nuxt with SSR capabilities,
Nuxt Layers architecture, and [Regle](https://reglejs.dev/)
for form validation.

This app is based on [apps/nuxt](../nuxt/README.md).
The main difference is that this app uses Regle for form validation
instead of VeeValidate.

## Get Started

Prerequisites:

- Node 22+
- pnpm

To set up the app execute the following commands.

```bash
git clone https://github.com/hirotaka/bulletproof-vue.git
cd bulletproof-vue
cd apps/nuxt-regle
cp .env.example .env
pnpm install
```

### Database Setup

Initialize the database schema:

```bash
pnpm db:push
```

Optionally, seed the database with sample data:

```bash
pnpm db:seed
```

After seeding, you can login with:

| Email               | Password    | Role  |
|---------------------|-------------|-------|
| <admin@example.com> | password123 | ADMIN |
| <user@example.com>  | password123 | USER  |

### `pnpm dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm build`

Builds the app for production.\
It correctly bundles Nuxt in production mode and optimizes the build
for the best performance.

See the section about
[deployment](https://nuxt.com/docs/getting-started/deployment)
for more information.

## Documentation

See [apps/nuxt documentation](../nuxt/README.md#documentation) for the base documentation.
