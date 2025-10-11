# React to Vue Migration - Key Points

## 📄 Generated Documents

### 1. **MIGRATION_PLAN.md** (Summary - English)

- Overall React to Vue migration plan
- 7 Phases (13-20 weeks)
- 117 Tasks
- Technology stack mapping
- Architecture principles
- **Cloudflare Pages migration included**

### 2. **MIGRATION_PLAN_DETAILED.md** (Detailed - English)

- **198 PRs** (1 PR = 1-2 hours)
- Detailed checklist for each PR
- Estimated time included
- Parallel work possibilities
- Weekly implementation schedule
- **Cloudflare Pages migration tasks (3 PRs)**

---

## 🎯 Main Points

### 1. Dual Migration Plan Structure

**IMPORTANT**: Each task requires implementation of **BOTH** documents:

- **MIGRATION_PLAN.md**: Contains detailed implementation checklists for each task (e.g., Task 1.1.1 includes Axios setup, interceptors, type definitions)
- **MIGRATION_PLAN_DETAILED.md**: Contains PR-level granularity and time estimates (e.g., PR 1.1.1 focuses on dependency installation only)

When working on a task number (e.g., 1.1.1), you must complete ALL requirements from MIGRATION_PLAN.md, not just the basic PR scope from MIGRATION_PLAN_DETAILED.md.

**IMPORTANT**: After completing a task, you MUST update the checkboxes in BOTH migration plan documents:
- Update checkboxes in **MIGRATION_PLAN.md** for the task section
- Update checkboxes in **MIGRATION_PLAN_DETAILED.md** for corresponding PR(s)

This ensures accurate progress tracking and makes it easy to see what has been completed at a glance.

### 2. PR-Level Granularity

Each PR is scoped to be completed in 1-2 hours, making tasks manageable and progress trackable.

### 3. Parallel Work Enabled

The structure allows multiple developers to work efficiently in parallel:

- **1 person**: 13-20 weeks
- **2 people**: 7-12 weeks (40% reduction)
- **3 people**: 5-9 weeks (55% reduction)
- **4 people**: 4-7 weeks (65% reduction)

### 4. English Output

Going forward, all conversation is in Japanese, but all document outputs are in English.

### 5. Effort Reduction

With proper team allocation and parallel execution, significant time savings are possible compared to sequential work.

---

## 📊 Phase Overview

| Phase | PRs | Weeks | Description |
|-------|-----|-------|-------------|
| **Phase 1** | 15 PRs | 1-2 weeks | Infrastructure Layer (API Client, Auth, Config) |
| **Phase 2** | 42 PRs | 2-3 weeks | UI Components (Forms, Feedback, Layouts) |
| **Phase 3** | 53 PRs | 4-6 weeks | Feature Modules (Discussions, Comments, Users, Auth) |
| **Phase 4** | 23 PRs | 2 weeks | Routing + Pages |
| **Phase 5** | 38 PRs | 2-3 weeks | Testing (MSW, Unit Tests, E2E) |
| **Phase 6** | 15 PRs | 1 week | Developer Experience (ESLint, Plop, Husky) |
| **Phase 7** | 12 PRs | 1-2 weeks | Final Adjustments + Documentation + Cloudflare Migration |
| **Total** | **198 PRs** | **13-20 weeks** | Complete migration |

---

## 🔧 Key Technology Mappings

| Category | React Version | Vue Version | Difficulty |
|----------|--------------|-------------|------------|
| **Framework** | React 18.3 | Vue 3.5 | ⚠️ Medium |
| **Routing** | React Router 7 | Vue Router 4 | ⚠️ Medium |
| **State Management** | Zustand | Pinia | ✅ Easy |
| **Data Fetching** | TanStack Query | @tanstack/vue-query | ✅ Easy |
| **Forms** | React Hook Form | VeeValidate | ⚠️ Medium |
| **Validation** | Zod | Zod | ✅ Same |
| **UI Primitives** | Radix UI | Radix Vue | ✅ Easy |
| **HTTP** | Axios | Axios | ✅ Same |
| **Styling** | Tailwind | Tailwind | ✅ Same |
| **Testing** | Vitest + Playwright | Vitest + Playwright | ✅ Same |
| **Mocking** | MSW | MSW | ✅ Same |
| **Build Tool** | Vite | Vite | ✅ Same |
| **Authentication** | react-query-auth | Custom composable | 🔴 Hard |
| **SEO** | react-helmet-async | @unhead/vue | ⚠️ Medium |
| **Deployment** | Vercel | Cloudflare Pages | ✅ Easy |

---

## 🏗️ Architecture Principles (Maintained)

All React version principles are maintained in Vue version:

✅ **Feature-Sliced Design**: Complete separation by feature
✅ **Unidirectional Dependencies**: ESLint enforcement (app → features → components/lib/utils)
✅ **No Cross-Feature Imports**: No direct imports between features
✅ **KEBAB_CASE Naming**: File/folder naming convention
✅ **Type Safety**: Strict TypeScript configuration
✅ **Comprehensive Testing**: MSW + Vitest + Playwright
✅ **Policy-Based Authorization**: Function-based authorization system
✅ **Query Options Pattern**: Standardized data fetching
✅ **Component Composition**: Headless components with Radix Vue
✅ **Tailwind + CVA**: Utility-first styling

---

## 🚀 Quick Start Recommendation

### Immediate Next Steps

1. **Review both migration plans**
   - `MIGRATION_PLAN.md` for high-level overview
   - `MIGRATION_PLAN_DETAILED.md` for granular PR-level tasks

2. **Team allocation** (if parallel work)
   - Phase 1: 1 person (foundation must be sequential)
   - Phase 2: 3 people (Forms, Feedback, Layouts can be parallel)
   - Phase 3: 4 people (Each feature can be parallel)

3. **Start with Phase 1, PR 1.1.1**
   - Install dependencies (`axios`, `@tanstack/vue-query`)
   - Build the foundation before expanding

---

## ⚠️ Risk Items to Watch

### High-Risk

1. **VeeValidate Learning Curve** - API differs significantly from React Hook Form
2. **Vue Router Guards vs React Router Loaders** - Different data preloading patterns
3. **Custom Auth Implementation** - No Vue equivalent of react-query-auth

### Medium-Risk

4. **ESLint Rule Migration** - Adapt React-specific rules to Vue
5. **Type Definition Consistency** - Ensure types are used consistently across all features

---

## 📝 Session Handoff Information

**Source Repository**: `/Users/hirotaka/Workspaces/github.com/alan2207/bulletproof-react/apps/react-vite`
**Target Repository**: `/Users/hirotaka/Workspaces/github.com/hirotaka/bulletproof-vue/.conductor/sao-paulo/apps/vue-vite`

**Current Status**: Migration plans completed and documented
**Next Action**: Begin implementation with Phase 1, PR 1.1.1

**Working Branch**: `react-to-vue-port`
**Main Branch**: `main`
**Remote Target**: `renewal`

---

## 💡 Tips for Success

1. **Follow PR order** - Each PR builds on previous ones
2. **Complete Phase 1 first** - Foundation is critical
3. **Write tests as you go** - Don't batch testing to the end
4. **Review architecture docs** - Understand Feature-Sliced Design principles
5. **Use the checklist** - Every PR should pass the standard checklist
6. **Communicate blockers early** - Especially for high-risk items

---

## 📚 Additional Resources

- **bulletproof-react**: Original React implementation
- **Radix Vue Docs**: <https://www.radix-vue.com/>
- **VeeValidate Docs**: <https://vee-validate.logaretm.com/v4/>
- **TanStack Vue Query**: <https://tanstack.com/query/latest/docs/vue/overview>
- **Feature-Sliced Design**: <https://feature-sliced.design/>

---

**Document Generated**: 2025-10-11
**Migration Status**: Planning Complete, Ready to Begin Implementation 🚀
