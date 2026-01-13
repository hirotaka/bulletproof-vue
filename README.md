# 🛡️ Bulletproof Vue & Nuxt

A simple, scalable, and powerful architecture aiming for production-ready Vue and Nuxt applications.

## Introduction

Vue is an excellent tool for building front-end applications. It has a diverse ecosystem with hundreds of great libraries for literally anything you might need. However, being forced to make so many choices can be overwhelming. It is also very flexible, you can write Vue applications in any way you like, but that flexibility comes with a cost. Since there is no pre-defined architecture that developers can follow, it often leads to a messy, inconsistent, and over-complicated codebase.

This repo attempts to present a way of creating Vue applications using some of the best tools in the ecosystem with a good project structure that scales very well. Based on the patterns from [Bulletproof React](https://github.com/alan2207/bulletproof-react), this architecture is adapted for the Vue ecosystem.

The goal here is to serve as a collection of resources and best practices when developing Vue applications. It is supposed to showcase solving most of the real-world problems of an application in a practical way and help developers write better applications.

Feel free to explore the sample app codebases to get the most value out of the repo.

## 📦 Sample Applications

This monorepo contains sample applications with different architectures:

### ⚡ [Vue (SPA)](apps/vue-vite)

A client-side Single Page Application using Vue + Vite.

- **Architecture**: Feature-based structure
- **Routing**: Vue Router with lazy loading
- **State**: TanStack Query (Vue Query) + Pinia
- **Best for**: Traditional SPAs, dashboards, admin panels

[View Documentation](apps/vue-vite/README.md)

### 🌐 Nuxt (Full-Stack)

Full-stack applications using Nuxt with SSR capabilities and Nuxt Layers architecture.

- **Architecture**: Nuxt Layers for modular features
- **Routing**: File-based routing with Nuxt
- **State**: Nuxt built-in composables
- **Best for**: SEO-critical apps, marketing sites, full-stack applications

[View Documentation](apps/nuxt/README.md)

#### Variations

The following apps demonstrate different form validation libraries based on the same architecture:

- [nuxt-regle](apps/nuxt-regle) - [Regle](https://reglejs.dev/)
- [nuxt-tanstack-form](apps/nuxt-tanstack-form) - [TanStack Form](https://tanstack.com/form/)
- [nuxt-formwerk](apps/nuxt-formwerk) - [Formwerk](https://formwerk.dev/)

## 🎯 What makes a Vue and Nuxt application "bulletproof"?

This repo doesn't aim to be a silver bullet for all Vue applications as there are many different use cases, but it tries to provide a solid foundation for building applications based on the following principles:

- ✅ Easy to get started with
- ✅ Simple to understand and maintain
- ✅ Uses the right tools for the job
- ✅ Clean boundaries between different parts of the application
- ✅ Everyone on the team is on the same page when it comes to how things are done
- ✅ Secure
- ✅ Performant
- ✅ Scalable in terms of codebase and team size
- ✅ Issues detectable as early as possible

### Disclaimer

This is not supposed to be a template, boilerplate or a framework. It is an opinionated guide that shows how to do some things in a certain way. You are not forced to do everything exactly as it is shown here, decide what works best for you and your team and stay consistent with your style.

To get most out of it, do not get limited by the technologies used in these sample apps, but rather focus on the principles and the concepts that are being presented here. The tools and libraries used here are just a suggestion, you can always replace them with something that fits your needs better. Sometimes, your project might require a slightly different approach, and that's totally fine.

## 🤝 Contributing

Contributions are always welcome! If you have any ideas, suggestions, fixes, feel free to contribute. You can do that by going through the following steps:

1. Clone this repo
2. Create a branch: `git checkout -b your-feature`
3. Make some changes
4. Test your changes
5. Push your branch and open a Pull Request

## 📄 License

[MIT](/LICENSE)

## 🙏 Credits

This project is inspired by [Bulletproof React](https://github.com/alan2207/bulletproof-react) by Alan Alickovic.
