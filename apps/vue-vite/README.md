# Vue Vite Application

A client-side Single Page Application using Vue + Vite with feature-based architecture.

[View Documentation](./docs/index.md)

## Get Started

Prerequisites:

- Node 20+
- pnpm

To set up the app execute the following commands.

```bash
git clone https://github.com/hirotaka/bulletproof-vue.git
cd bulletproof-vue
cd apps/vue-vite
cp .env.example .env
pnpm install
```

### `pnpm dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `pnpm build`

Builds the app for production to the `dist` folder.\
It correctly bundles Vue in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.
