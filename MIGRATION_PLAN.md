# React to Vue Migration Plan - bulletproof-react → bulletproof-vue

## Project Overview

**Source**: `/Users/hirotaka/Workspaces/github.com/alan2207/bulletproof-react/apps/react-vite`
**Target**: `/Users/hirotaka/Workspaces/github.com/hirotaka/bulletproof-vue/.conductor/sao-paulo/apps/vue-vite`

## Current Status Analysis

### React Version Features

- **6,833 lines of TypeScript/React code**
- **Bulletproof Architecture**: Strict dependency rules (ESLint enforced)
- **Feature-Sliced Design**: Complete separation by feature
- **Complete Auth/Authorization System**: Role-based + Policy-based
- **4 Business Features**: Discussions, Comments, Users, Teams
- **19 UI Components**: Radix UI + Tailwind
- **Comprehensive Testing**: MSW + Vitest + Playwright

### Vue Version Current State

- **Foundation Layer Complete**: Vite, TypeScript, Pinia, Vue Router
- **6 UI Components**: Button, Spinner, Link, Table, Drawer, MDPreview
- **Type Definitions Exist**: User, Team, Discussion, Comment (not implemented)
- **Demo App Only**: HomeView, AboutView only

---

## Phase 0: Initial Setup (Before Development Starts)

### 0.1 Cloudflare Pages Configuration

**Purpose**: Set up deployment infrastructure to enable preview deployments for all PRs from the start of development.

**Tasks**:

#### Task 0.1.1: Cloudflare Pages Migration

- [x] Create `wrangler.toml` for Cloudflare Pages configuration
  - [x] Configure build command and output directory
  - [x] Set Node.js version
- [x] Add `_headers` file for custom headers
  - [x] Security headers (CSP, X-Frame-Options, etc.)
  - [x] Caching headers
- [x] Add `_redirects` file for SPA routing
  - [x] Fallback all routes to index.html (SPA support)
- [x] Remove Vercel configuration
  - [x] Delete `vercel.json` (if exists)
- [ ] Connect GitHub repository to Cloudflare Pages
  - [ ] Configure production branch (main/renewal)
  - [ ] Configure preview deployments for PRs
  - [ ] Set up environment variables in Cloudflare dashboard
- [ ] Configure custom domain (if needed)
- [ ] Verify deployment works correctly
  - [ ] Test production deployment
  - [ ] Test PR preview deployments
- [x] Update documentation with new deployment URL
- [ ] Archive/disable Vercel project

### 0.2 CI/CD Configuration

**Purpose**: Set up GitHub Actions CI pipeline to run tests, linting, and type checking on all PRs and commits.

**Tasks**:

#### Task 0.2.1: Fix Type Errors and Dependencies

- [x] Install missing devDependencies
  - [x] Add `@tanstack/vue-query-devtools` to devDependencies
- [x] Fix file naming case sensitivity issues
  - [x] Update import statements in `button/index.ts` to use `button.vue`
  - [x] Update import statements in `link/index.ts` to use `link.vue`
  - [x] Update import statements in `spinner/index.ts` to use `spinner.vue`
- [x] Fix TypeScript type errors
  - [x] Fix `TablePaginationProps` export in `src/components/ui/table/TablePagination.vue`
  - [x] Remove deprecated `onSuccess` from `useQuery` in `src/lib/auth.ts`
  - [x] Add proper type annotations where implicit `any` exists
  - [x] Fix `import.meta.env.DEV` usage in template (moved to script)
- [x] Fix ESLint configuration
  - [x] Disable `vue/multi-word-component-names` rule for UI primitives
  - [x] Ignore `.cjs` files from linting
- [x] Verify all checks pass
  - [x] Run `pnpm run type-check` successfully
  - [x] Run `pnpm run build` successfully
  - [x] Run `pnpm run lint` successfully
  - [x] Run `pnpm run test:unit` successfully

#### Task 0.2.2: GitHub Actions CI Setup

- [x] Create/update `.github/workflows/ci.yml`
  - [x] Configure triggers (push/PR to main and renewal branches)
  - [x] Set up pnpm with caching
  - [x] Configure Node.js version (22)
  - [x] Set working directory to `apps/vue-vite`
- [x] Add `all-cli-check` job
  - [x] Install dependencies
  - [x] Run type-check
  - [x] Run build
  - [x] Run lint
  - [x] Run unit tests
- [x] Add `playwright-run` job
  - [x] Install dependencies
  - [x] Run build
  - [x] Install Playwright browsers
  - [x] Run e2e tests
  - [x] Upload test reports as artifacts
- [x] Test CI pipeline locally
- [ ] Verify CI runs successfully on GitHub (pending PR)

---

## Phase 1: Infrastructure Layer (1-2 weeks)

### 1.1 API Client Layer

**Directory Structure**:

```
/src/lib/
├── api-client.ts        # Axios configuration + interceptors
└── vue-query.ts         # TanStack Vue Query configuration
```

**Tasks**:

#### Task 1.1.1: Axios Client Setup

- [x] Install Axios (`pnpm add axios`)
- [x] Create `src/lib/api-client.ts`
- [x] Create Axios instance (baseURL configuration, withCredentials: true)
- [x] Implement request interceptor (automatic authentication token attachment)
- [x] Implement response interceptor
  - [x] Automatic response data unwrapping (`response.data`)
  - [x] Error handling (login redirect on 401)
  - [ ] Global error notification (integration with notificationsStore) - TODO: Task 1.2.x
- [x] Add type definitions (ApiClient, ApiError)

#### Task 1.1.2: Vue Query (TanStack Query) Setup

- [x] Install `@tanstack/vue-query`
- [x] Create `src/lib/vue-query.ts`
- [x] Create and configure QueryClient
  - [x] Default options (staleTime, cacheTime, retry configuration)
  - [x] Error handling configuration
- [x] Add QueryClientProvider in `src/app/provider.ts`
- [x] Configure Vue Query Devtools (development environment only)

**Differences from React**:

- `axios.create()` is identical
- Error handling uses Vue Router's `router.push()`
- Query client configuration is almost the same as React

---

### 1.2 Authentication System

**Directory Structure**:

```
/src/lib/
├── auth.ts              # Authentication composable (useAuth)
└── authorization.ts     # Authorization component + utilities

/src/stores/
└── auth.ts              # Authentication state management (Pinia)
```

**Tasks**:

#### Task 1.2.1: Create Authentication Pinia Store

- [x] Create `src/stores/auth.ts`
- [x] Define store state
  - [x] `user: User | null`
  - [x] `isAuthenticated: computed`
- [x] Define actions
  - [x] `setUser(user: User | null)`
  - [x] `clearUser()`
- [x] Consider localStorage persistence (optional)

#### Task 1.2.2: Implement useAuth Composable

- [x] Create `src/lib/auth.ts`
- [x] Implement `useAuth` composable
  - [x] `login(data: LoginInput)` - Login API call
  - [x] `register(data: RegisterInput)` - Registration API call
  - [x] `logout()` - Logout processing
  - [x] `useUser()` - Get current user (Vue Query)
- [x] Create Zod validation schemas
  - [x] `LoginInput` schema
  - [x] `RegisterInput` schema
- [x] Implement API functions
  - [x] `POST /auth/login`
  - [x] `POST /auth/register`
  - [x] `POST /auth/logout`
  - [x] `GET /auth/me`

#### Task 1.2.3: Implement Authorization System

- [x] Create `src/lib/authorization.ts`
- [x] Create role definition types (`Role = 'ADMIN' | 'USER'`)
- [x] Create policy definition types

  ```typescript
  type Policy = {
    'comment:delete': (user: User, comment: Comment) => boolean
    'discussion:delete': (user: User, discussion: Discussion) => boolean
    'user:delete': (user: User) => boolean
  }
  ```

- [x] Implement `POLICIES` object
- [x] Implement `useAuthorization` composable
  - [x] `checkAccess(policy, data?)` function
  - [x] `hasRole(role)` function
- [x] Create `Authorization.vue` component
  - [x] `policyCheck` prop
  - [x] `allowedRoles` prop
  - [x] `forbiddenFallback` slot

**Differences from React**:

- `react-query-auth` → Custom implementation (useAuth composable + Pinia)
- Context API → Pinia store
- HOC → composable

---

### 1.3 Environment Configuration + Path Configuration

**Directory Structure**:

```
/src/config/
├── env.ts               # Environment variables with Zod validation
└── paths.ts             # Route path definitions
```

**Tasks**:

#### Task 1.3.1: Environment Variable Configuration

- [x] Create `.env` file (copy from `.env.example`)
- [x] Define environment variables
  - [x] `VITE_APP_API_URL`
  - [x] `VITE_APP_ENABLE_API_MOCKING` (true/false)
- [x] Create `src/config/env.ts`
- [x] Validate environment variables with Zod schema
- [x] Export type-safe env object
- [x] Error handling (when required variables are missing)

#### Task 1.3.2: Create Path Definitions

- [x] Create `src/config/paths.ts`
- [x] Define path object

  ```typescript
  export const paths = {
    home: { path: '/', getHref: () => '/' },
    auth: {
      login: { path: '/auth/login', getHref: () => '/auth/login' },
      register: { path: '/auth/register', getHref: () => '/auth/register' },
    },
    app: {
      root: { path: '/app', getHref: () => '/app' },
      dashboard: { path: '/app/dashboard', getHref: () => '/app/dashboard' },
      discussions: {
        list: { path: '/app/discussions', getHref: () => '/app/discussions' },
        detail: {
          path: '/app/discussions/:id',
          getHref: (id: string) => `/app/discussions/${id}`
        },
      },
      profile: { path: '/app/profile', getHref: () => '/app/profile' },
      users: { path: '/app/users', getHref: () => '/app/users' },
    },
  }
  ```

- [x] Add type definitions

---

## Phase 2: UI Component Expansion (2-3 weeks)

### 2.1 Form Components

**Directory Structure**:

```
/src/components/ui/
├── form/                # VeeValidate integrated form
│   ├── Form.vue
│   ├── Form.stories.ts
│   └── index.ts
├── input/
│   ├── Input.vue
│   ├── Input.stories.ts
│   └── index.ts
├── textarea/
│   ├── Textarea.vue
│   ├── Textarea.stories.ts
│   └── index.ts
├── select/
│   ├── Select.vue
│   ├── SelectContent.vue
│   ├── SelectItem.vue
│   ├── SelectTrigger.vue
│   ├── Select.stories.ts
│   └── index.ts
├── checkbox/
│   ├── Checkbox.vue
│   ├── Checkbox.stories.ts
│   └── index.ts
├── label/
│   ├── Label.vue
│   └── index.ts
├── switch/
│   ├── Switch.vue
│   ├── Switch.stories.ts
│   └── index.ts
└── field-wrapper/
    ├── FieldWrapper.vue
    └── index.ts
```

**Tasks**:

#### Task 2.1.1: VeeValidate Setup

- [ ] Install `vee-validate` and `@vee-validate/zod`
- [ ] Add global configuration (as needed)

#### Task 2.1.2: Form Component

- [ ] Create `src/components/ui/form/Form.vue`
- [ ] Define Props
  - [ ] `schema: ZodSchema` - Validation schema
  - [ ] `initialValues?: object` - Initial values
- [ ] Integrate VeeValidate's `useForm`
- [ ] Form submission processing
- [ ] Error handling
- [ ] Receive form fields via slot
- [ ] Create Storybook stories

#### Task 2.1.3: Input Component

- [ ] Create `src/components/ui/input/Input.vue`
- [ ] Define Props
  - [ ] `type`, `placeholder`, `disabled`, `readonly`
  - [ ] `modelValue` (v-model support)
- [ ] Integrate with VeeValidate's `useField`
- [ ] Error state styling
- [ ] Apply Tailwind styles
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

#### Task 2.1.4: Textarea Component

- [ ] Create `src/components/ui/textarea/Textarea.vue`
- [ ] Same Props as Input
- [ ] Add `rows` prop
- [ ] Implement auto-resize feature (optional)
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

#### Task 2.1.5: Select Component (Radix Vue)

- [ ] Install Radix Vue Select (check existing)
- [ ] Create multiple components under `src/components/ui/select/`
  - [ ] `Select.vue` (root)
  - [ ] `SelectTrigger.vue`
  - [ ] `SelectContent.vue`
  - [ ] `SelectItem.vue`
- [ ] Integrate with VeeValidate
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

#### Task 2.1.6: Checkbox Component (Radix Vue)

- [ ] Create `src/components/ui/checkbox/Checkbox.vue`
- [ ] Use Radix Vue Checkbox
- [ ] Integrate with VeeValidate
- [ ] Label integration
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

#### Task 2.1.7: Switch Component (Radix Vue)

- [ ] Create `src/components/ui/switch/Switch.vue`
- [ ] Use Radix Vue Switch
- [ ] Integrate with VeeValidate
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

#### Task 2.1.8: Label Component

- [ ] Create `src/components/ui/label/Label.vue`
- [ ] Use Radix Vue Label
- [ ] Basic styling
- [ ] Required mark display feature

#### Task 2.1.9: FieldWrapper Component

- [ ] Create `src/components/ui/field-wrapper/FieldWrapper.vue`
- [ ] Define Props
  - [ ] `label`, `error`, `description`, `required`
- [ ] Display label, error message, description
- [ ] Error state styling
- [ ] Create Storybook stories

**Differences from React**:

- React Hook Form → VeeValidate
- `useForm` → `useForm` (VeeValidate)
- zodResolver → `@vee-validate/zod`
- `<Controller>` → `useField` composable

---

### 2.2 Feedback Components

**Directory Structure**:

```
/src/components/ui/
├── notifications/
│   ├── Notifications.vue
│   ├── Notification.vue
│   └── index.ts
├── dialog/
│   ├── Dialog.vue
│   ├── DialogContent.vue
│   ├── DialogHeader.vue
│   ├── DialogTitle.vue
│   ├── DialogDescription.vue
│   ├── DialogFooter.vue
│   ├── Dialog.stories.ts
│   └── index.ts
├── confirmation-dialog/
│   ├── ConfirmationDialog.vue
│   ├── ConfirmationDialog.stories.ts
│   └── index.ts
└── dropdown/
    ├── Dropdown.vue
    ├── DropdownContent.vue
    ├── DropdownItem.vue
    ├── DropdownSeparator.vue
    ├── Dropdown.stories.ts
    └── index.ts

/src/stores/
└── notifications.ts     # Notification management (Pinia)
```

**Tasks**:

#### Task 2.2.1: Create Notifications Store

- [ ] Create `src/stores/notifications.ts`
- [ ] Notification type definition

  ```typescript
  type Notification = {
    id: string
    type: 'info' | 'success' | 'warning' | 'error'
    title: string
    message?: string
  }
  ```

- [ ] Store state: `notifications: Notification[]`
- [ ] Actions
  - [ ] `addNotification(notification)`
  - [ ] `removeNotification(id)`
  - [ ] `showNotification(type, title, message)` (helper)
- [ ] Auto-removal feature (after 5 seconds)

#### Task 2.2.2: Notifications Component

- [ ] Create `src/components/ui/notifications/Notifications.vue`
- [ ] Integrate with notifications store
- [ ] Display notification list (fixed position)
- [ ] Animation (enter/leave)
- [ ] Create `src/components/ui/notifications/Notification.vue`
  - [ ] Display individual notification
  - [ ] Close button
  - [ ] Type-based styling (color coding)
- [ ] Add Notifications component to `src/app/provider.ts`
- [ ] Create Storybook stories

#### Task 2.2.3: Dialog Component (Radix Vue)

- [ ] Install Radix Vue Dialog (check existing)
- [ ] Create multiple components under `src/components/ui/dialog/`
  - [ ] `Dialog.vue` (root)
  - [ ] `DialogContent.vue` (modal body)
  - [ ] `DialogHeader.vue`
  - [ ] `DialogTitle.vue`
  - [ ] `DialogDescription.vue`
  - [ ] `DialogFooter.vue`
- [ ] Accessibility support (aria attributes, keyboard operations)
- [ ] Animation (Tailwind Animate)
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

#### Task 2.2.4: ConfirmationDialog Component

- [ ] Create `src/components/ui/confirmation-dialog/ConfirmationDialog.vue`
- [ ] Define Props
  - [ ] `open`, `title`, `body`, `confirmText`, `cancelText`
  - [ ] `isDone`, `isLoading`
- [ ] Define Emits: `confirm`, `cancel`
- [ ] Use Dialog component
- [ ] Confirm/cancel buttons
- [ ] Loading state display
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

#### Task 2.2.5: Dropdown Component (Radix Vue)

- [ ] Install Radix Vue DropdownMenu (check existing)
- [ ] Create multiple components under `src/components/ui/dropdown/`
  - [ ] `Dropdown.vue` (root)
  - [ ] `DropdownTrigger.vue`
  - [ ] `DropdownContent.vue`
  - [ ] `DropdownItem.vue`
  - [ ] `DropdownSeparator.vue`
- [ ] Keyboard navigation support
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

---

### 2.3 Layout Components

**Directory Structure**:

```
/src/components/layouts/
├── auth-layout.vue      # Authentication page layout
├── dashboard-layout.vue # Dashboard layout
└── content-layout.vue   # Content wrapper
```

**Tasks**:

#### Task 2.3.1: AuthLayout Component

- [ ] Create `src/components/layouts/auth-layout.vue`
- [ ] Center-aligned layout
- [ ] Logo display
- [ ] Display content with `<RouterView>`
- [ ] Responsive design

#### Task 2.3.2: DashboardLayout Component

- [ ] Create `src/components/layouts/dashboard-layout.vue`
- [ ] Implement sidebar navigation
  - [ ] Logo
  - [ ] Navigation links (Discussions, Users, Profile)
  - [ ] Active state highlighting
- [ ] Implement header
  - [ ] User menu (use Dropdown component)
  - [ ] Logout button
- [ ] Main content area
- [ ] Mobile support (hamburger menu)
- [ ] Responsive design

#### Task 2.3.3: ContentLayout Component

- [ ] Create `src/components/layouts/content-layout.vue`
- [ ] Define Props
  - [ ] `title: string` - Page title
- [ ] Display page title
- [ ] Display content via slot
- [ ] Breadcrumbs (optional)

---

### 2.4 Other UI Components

**Directory Structure**:

```
/src/components/ui/
├── error/
│   ├── Error.vue
│   └── index.ts
├── seo/
│   ├── Head.vue
│   └── index.ts
└── form-drawer/
    ├── FormDrawer.vue
    ├── FormDrawer.stories.ts
    └── index.ts
```

**Tasks**:

#### Task 2.4.1: Error Component

- [ ] Create `src/components/ui/error/Error.vue`
- [ ] Define Props
  - [ ] `error: Error | string`
- [ ] Display error message
- [ ] Error icon
- [ ] Styling (red theme)
- [ ] Create Storybook stories

#### Task 2.4.2: Head (SEO) Component

- [ ] Install `@unhead/vue`
- [ ] Create `src/components/ui/seo/Head.vue`
- [ ] Define Props
  - [ ] `title`, `description`
- [ ] Use `useHead` composable
- [ ] Set page title
- [ ] Set meta description
- [ ] Configure `createHead()` in `src/app/provider.ts`

#### Task 2.4.3: FormDrawer Component

- [ ] Create `src/components/ui/form-drawer/FormDrawer.vue`
- [ ] Define Props
  - [ ] `open`, `title`, `submitText`, `isLoading`
- [ ] Define Emits: `close`, `submit`
- [ ] Use Drawer component
- [ ] Form slot
- [ ] Submit/cancel buttons
- [ ] Loading state
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

---

## Phase 3: Feature Module Implementation (4-6 weeks)

### 3.1 Discussions Feature

**Directory Structure**:

```
/src/features/discussions/
├── api/
│   ├── get-discussions.ts
│   ├── get-discussion.ts
│   ├── create-discussion.ts
│   ├── update-discussion.ts
│   └── delete-discussion.ts
├── components/
│   ├── discussions-list.vue
│   ├── discussion-view.vue
│   ├── create-discussion.vue
│   ├── update-discussion.vue
│   └── delete-discussion.vue
└── types/
    └── index.ts
```

**Tasks**:

#### Task 3.1.1: Discussions API Functions

- [ ] Create `src/features/discussions/types/index.ts`
  - [ ] `Discussion`, `DiscussionInput` type definitions
- [ ] Create `src/features/discussions/api/get-discussions.ts`
  - [ ] `GET /discussions` API call
  - [ ] Pagination support (`page` parameter)
  - [ ] `getDiscussionsQueryOptions` function (for Vue Query)
- [ ] Create `src/features/discussions/api/get-discussion.ts`
  - [ ] `GET /discussions/:id` API call
  - [ ] `getDiscussionQueryOptions` function
- [ ] Create `src/features/discussions/api/create-discussion.ts`
  - [ ] `POST /discussions` API call
  - [ ] `useCreateDiscussion` mutation
- [ ] Create `src/features/discussions/api/update-discussion.ts`
  - [ ] `PATCH /discussions/:id` API call
  - [ ] `useUpdateDiscussion` mutation
- [ ] Create `src/features/discussions/api/delete-discussion.ts`
  - [ ] `DELETE /discussions/:id` API call
  - [ ] `useDeleteDiscussion` mutation

#### Task 3.1.2: DiscussionsList Component

- [ ] Create `src/features/discussions/components/discussions-list.vue`
- [ ] Define Props: `page: number`
- [ ] Fetch data with `useQuery(getDiscussionsQueryOptions({ page }))`
- [ ] Display list using Table component
- [ ] Define columns (Title, Team, Author, Created At, Actions)
- [ ] Implement pagination
- [ ] Prefetching (on hover next page)
- [ ] Loading state
- [ ] Error state
- [ ] Empty state (no data)
- [ ] Create Vitest unit tests

#### Task 3.1.3: DiscussionView Component

- [ ] Create `src/features/discussions/components/discussion-view.vue`
- [ ] Define Props: `discussionId: string`
- [ ] Fetch data with `useQuery(getDiscussionQueryOptions({ discussionId }))`
- [ ] Display discussion details
  - [ ] Title
  - [ ] Author information
  - [ ] Body (display with MDPreview)
  - [ ] Created date
- [ ] Edit/delete buttons (permission check)
- [ ] Create Vitest unit tests

#### Task 3.1.4: CreateDiscussion Component

- [ ] Create `src/features/discussions/components/create-discussion.vue`
- [ ] Create Zod schema (`title`, `body`)
- [ ] Use FormDrawer component
- [ ] Form using Form, Input, Textarea
- [ ] `useCreateDiscussion` mutation
- [ ] Handle success (notification, list update, close Drawer)
- [ ] Error handling
- [ ] Create Vitest unit tests

#### Task 3.1.5: UpdateDiscussion Component

- [ ] Create `src/features/discussions/components/update-discussion.vue`
- [ ] Define Props: `discussionId: string`
- [ ] Fetch existing data and set initial values
- [ ] Create Zod schema
- [ ] Use FormDrawer component
- [ ] `useUpdateDiscussion` mutation
- [ ] Handle success (notification, refetch data, close Drawer)
- [ ] Error handling
- [ ] Create Vitest unit tests

#### Task 3.1.6: DeleteDiscussion Component

- [ ] Create `src/features/discussions/components/delete-discussion.vue`
- [ ] Define Props: `discussionId: string`
- [ ] Use ConfirmationDialog component
- [ ] `useDeleteDiscussion` mutation
- [ ] Handle success (notification, remove from list, close Dialog)
- [ ] Error handling
- [ ] Create Vitest unit tests

**Differences from React**:

- `queryOptions` → function returning composable
- `useQuery` → `useQuery` (Vue Query)
- JSX → `<template>`

---

### 3.2 Comments Feature

**Directory Structure**:

```
/src/features/comments/
├── api/
│   ├── get-comments.ts
│   ├── create-comment.ts
│   └── delete-comment.ts
├── components/
│   ├── comments-list.vue
│   ├── comments.vue
│   ├── create-comment.vue
│   └── delete-comment.vue
└── types/
    └── index.ts
```

**Tasks**:

#### Task 3.2.1: Comments API Functions

- [ ] Create `src/features/comments/types/index.ts`
  - [ ] `Comment`, `CommentInput` type definitions
- [ ] Create `src/features/comments/api/get-comments.ts`
  - [ ] `GET /comments?discussionId=:id` API call
  - [ ] Infinite Query support (`pageParam`)
  - [ ] `getCommentsInfiniteQueryOptions` function
- [ ] Create `src/features/comments/api/create-comment.ts`
  - [ ] `POST /comments` API call
  - [ ] `useCreateComment` mutation
- [ ] Create `src/features/comments/api/delete-comment.ts`
  - [ ] `DELETE /comments/:id` API call
  - [ ] `useDeleteComment` mutation

#### Task 3.2.2: CommentsList Component

- [ ] Create `src/features/comments/components/comments-list.vue`
- [ ] Define Props: `discussionId: string`
- [ ] Fetch data with `useInfiniteQuery(getCommentsInfiniteQueryOptions({ discussionId }))`
- [ ] Display comment list
  - [ ] Author information
  - [ ] Comment body (MDPreview)
  - [ ] Created date
  - [ ] Delete button (permission check)
- [ ] Implement infinite scroll (Intersection Observer)
- [ ] "Load more" button (alternative)
- [ ] Loading state
- [ ] Empty state (no comments)
- [ ] Create Vitest unit tests

#### Task 3.2.3: Comments Component (Container)

- [ ] Create `src/features/comments/components/comments.vue`
- [ ] Define Props: `discussionId: string`
- [ ] Integrate CommentsList and CreateComment
- [ ] Layout

#### Task 3.2.4: CreateComment Component

- [ ] Create `src/features/comments/components/create-comment.vue`
- [ ] Define Props: `discussionId: string`
- [ ] Create Zod schema (`body`)
- [ ] Form using Form, Textarea
- [ ] `useCreateComment` mutation
- [ ] Handle success (notification, update comment list, reset form)
- [ ] Error handling
- [ ] Create Vitest unit tests

#### Task 3.2.5: DeleteComment Component

- [ ] Create `src/features/comments/components/delete-comment.vue`
- [ ] Define Props: `commentId: string`
- [ ] Authorization check (`comment:delete` policy with `useAuthorization`)
- [ ] Use ConfirmationDialog component
- [ ] `useDeleteComment` mutation
- [ ] Handle success (notification, update comment list, close Dialog)
- [ ] Error handling
- [ ] Create Vitest unit tests

---

### 3.3 Users Feature

**Directory Structure**:

```
/src/features/users/
├── api/
│   ├── get-users.ts
│   ├── update-profile.ts
│   └── delete-user.ts
├── components/
│   ├── users-list.vue
│   ├── update-profile.vue
│   └── delete-user.vue
└── types/
    └── index.ts
```

**Tasks**:

#### Task 3.3.1: Users API Functions

- [ ] Create `src/features/users/types/index.ts`
  - [ ] `UpdateProfileInput` type definition
- [ ] Create `src/features/users/api/get-users.ts`
  - [ ] `GET /users` API call (admin only)
  - [ ] `getUsersQueryOptions` function
- [ ] Create `src/features/users/api/update-profile.ts`
  - [ ] `PATCH /profile` API call
  - [ ] `useUpdateProfile` mutation
- [ ] Create `src/features/users/api/delete-user.ts`
  - [ ] `DELETE /users/:id` API call (admin only)
  - [ ] `useDeleteUser` mutation

#### Task 3.3.2: UsersList Component

- [ ] Create `src/features/users/components/users-list.vue`
- [ ] Authorization check (ADMIN role only)
- [ ] Fetch data with `useQuery(getUsersQueryOptions())`
- [ ] Display list using Table component
- [ ] Define columns (Name, Email, Role, Team, Actions)
- [ ] Delete button
- [ ] Loading state
- [ ] Error state
- [ ] Create Vitest unit tests

#### Task 3.3.3: UpdateProfile Component

- [ ] Create `src/features/users/components/update-profile.vue`
- [ ] Fetch current user information as initial values
- [ ] Create Zod schema (`firstName`, `lastName`, `email`, `bio`)
- [ ] Form using Form, Input, Textarea
- [ ] `useUpdateProfile` mutation
- [ ] Handle success (notification, update user information)
- [ ] Error handling
- [ ] Create Vitest unit tests

#### Task 3.3.4: DeleteUser Component

- [ ] Create `src/features/users/components/delete-user.vue`
- [ ] Define Props: `userId: string`
- [ ] Authorization check (ADMIN role only)
- [ ] Use ConfirmationDialog component
- [ ] `useDeleteUser` mutation
- [ ] Handle success (notification, update user list, close Dialog)
- [ ] Error handling
- [ ] Create Vitest unit tests

---

### 3.4 Teams Feature

**Directory Structure**:

```
/src/features/teams/
├── api/
│   └── get-teams.ts
└── types/
    └── index.ts
```

**Tasks**:

#### Task 3.4.1: Teams API Functions

- [ ] Create `src/features/teams/types/index.ts`
  - [ ] Reference type definitions from existing `/src/types/api.ts`
- [ ] Create `src/features/teams/api/get-teams.ts`
  - [ ] `GET /teams` API call
  - [ ] `getTeamsQueryOptions` function
  - [ ] For team selection during registration

---

### 3.5 Auth Feature

**Directory Structure**:

```
/src/features/auth/
├── components/
│   ├── login-form.vue
│   └── register-form.vue
└── types/
    └── index.ts
```

**Tasks**:

#### Task 3.5.1: LoginForm Component

- [ ] Create `src/features/auth/components/login-form.vue`
- [ ] Create Zod schema (`email`, `password`)
- [ ] Form using Form, Input
- [ ] Call `useAuth().login`
- [ ] Handle success (redirect to dashboard)
- [ ] Error handling (display error message)
- [ ] Create Vitest unit tests

#### Task 3.5.2: RegisterForm Component

- [ ] Create `src/features/auth/components/register-form.vue`
- [ ] Create Zod schema
  - [ ] `email`, `password`, `firstName`, `lastName`
  - [ ] `teamId` (select existing team)
  - [ ] `teamName` (create new team)
- [ ] Fetch team list with `useQuery(getTeamsQueryOptions())`
- [ ] Form using Form, Input, Select
- [ ] Team selection or creation toggle UI
- [ ] Call `useAuth().register`
- [ ] Handle success (redirect to dashboard)
- [ ] Error handling
- [ ] Create Vitest unit tests

---

## Phase 4: Routing + Pages (2 weeks)

### 4.1 Route Structure

**Directory Structure**:

```
/src/app/routes/
├── landing.vue          # Landing page
├── not-found.vue        # 404 page
├── auth/
│   ├── login.vue
│   └── register.vue
└── app/
    ├── root.vue         # Protected app shell
    ├── dashboard.vue
    ├── profile.vue
    ├── users.vue
    └── discussions/
        ├── discussions.vue
        └── discussion.vue
```

**Tasks**:

#### Task 4.1.1: Landing Page

- [ ] Create `src/app/routes/landing.vue`
- [ ] Landing page design
  - [ ] Hero section
  - [ ] Feature showcase
  - [ ] Login/registration CTAs
- [ ] Set meta information with Head (SEO) component
- [ ] Redirect to dashboard if logged in

#### Task 4.1.2: NotFound Page

- [ ] Create `src/app/routes/not-found.vue`
- [ ] 404 error message
- [ ] Link to return home
- [ ] Head (SEO) component

#### Task 4.1.3: Login Page

- [ ] Create `src/app/routes/auth/login.vue`
- [ ] Use AuthLayout
- [ ] Place LoginForm component
- [ ] Link to registration page
- [ ] Head (SEO) component

#### Task 4.1.4: Register Page

- [ ] Create `src/app/routes/auth/register.vue`
- [ ] Use AuthLayout
- [ ] Place RegisterForm component
- [ ] Link to login page
- [ ] Head (SEO) component

#### Task 4.1.5: App Root Page (Protected Shell)

- [ ] Create `src/app/routes/app/root.vue`
- [ ] Use DashboardLayout
- [ ] Display nested routes with `<RouterView>`
- [ ] Authentication check (redirect to login if not logged in)
- [ ] Preload user information

#### Task 4.1.6: Dashboard Page

- [ ] Create `src/app/routes/app/dashboard.vue`
- [ ] Use ContentLayout
- [ ] Display dashboard statistics (optional)
- [ ] Welcome message
- [ ] Quick actions (Discussion creation, etc.)
- [ ] Head (SEO) component

#### Task 4.1.7: Discussions List Page

- [ ] Create `src/app/routes/app/discussions/discussions.vue`
- [ ] Use ContentLayout
- [ ] Place DiscussionsList component
- [ ] Place CreateDiscussion component (button + Drawer)
- [ ] Pagination support (URL query parameter `?page=1`)
- [ ] Head (SEO) component

#### Task 4.1.8: Discussion Detail Page

- [ ] Create `src/app/routes/app/discussions/discussion.vue`
- [ ] Use ContentLayout
- [ ] Place DiscussionView component
- [ ] Place UpdateDiscussion component (edit button + Drawer)
- [ ] Place DeleteDiscussion component (delete button + Dialog)
- [ ] Place Comments component
- [ ] Head (SEO) component (discussion title)

#### Task 4.1.9: Profile Page

- [ ] Create `src/app/routes/app/profile.vue`
- [ ] Use ContentLayout
- [ ] Place UpdateProfile component
- [ ] Display user information
- [ ] Head (SEO) component

#### Task 4.1.10: Users Page

- [ ] Create `src/app/routes/app/users.vue`
- [ ] Use ContentLayout
- [ ] Authorization check (ADMIN role only)
- [ ] Place UsersList component
- [ ] Head (SEO) component

---

### 4.2 Route Configuration

**Tasks**:

#### Task 4.2.1: Vue Router Configuration

- [ ] Update `src/app/router.ts`
- [ ] Create route definitions

  ```typescript
  const routes = [
    { path: '/', component: LandingPage },
    { path: '/auth/login', component: LoginPage },
    { path: '/auth/register', component: RegisterPage },
    {
      path: '/app',
      component: AppRoot,
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', component: DashboardPage },
        { path: 'discussions', component: DiscussionsPage },
        { path: 'discussions/:id', component: DiscussionPage },
        { path: 'profile', component: ProfilePage },
        { path: 'users', component: UsersPage, meta: { requiresRole: 'ADMIN' } },
      ],
    },
    { path: '/:pathMatch(.*)*', component: NotFoundPage },
  ]
  ```

- [ ] Configure lazy loading (dynamic imports for all routes)

  ```typescript
  component: () => import('./routes/app/dashboard.vue')
  ```

#### Task 4.2.2: Implement Route Guards

- [ ] Authentication check in `beforeEach` guard
  - [ ] Check if logged in when `meta.requiresAuth` is present
  - [ ] Redirect to `/auth/login` if not logged in
- [ ] Authorization check in `beforeEach` guard
  - [ ] Check user role when `meta.requiresRole` is present
  - [ ] Redirect to `/app/dashboard` + notification if no permission
- [ ] Redirect processing for logged-in users accessing auth pages

#### Task 4.2.3: Implement Data Preloading

- [ ] Pre-execute queries in `beforeResolve` guard
  - [ ] DiscussionsPage: Prefetch based on page parameter
  - [ ] DiscussionPage: Prefetch based on discussionId
- [ ] Consider Suspense pattern (optional)

#### Task 4.2.4: Configure Scroll Behavior

- [ ] Configure `scrollBehavior`
  - [ ] Scroll to top on page transitions
  - [ ] Restore scroll position on history back/forward

**Differences from React**:

- React Router loaders → Vue Router `beforeResolve`
- `createBrowserRouter` → `createRouter`
- `<Outlet>` → `<RouterView>`

---

## Phase 5: Testing Strategy (2-3 weeks)

### 5.1 MSW Setup

**Directory Structure**:

```
/src/testing/
├── mocks/
│   ├── browser.ts       # MSW for browser
│   ├── server.ts        # MSW for Node (Vitest)
│   ├── db.ts            # @mswjs/data in-memory DB
│   ├── handlers/        # Request handlers
│   │   ├── auth.ts
│   │   ├── discussions.ts
│   │   ├── comments.ts
│   │   ├── users.ts
│   │   └── teams.ts
│   └── utils.ts
├── data-generators.ts   # @ngneat/falso data generation
├── setup-tests.ts       # Vitest setup
└── test-utils.ts        # Custom render
```

**Tasks**:

#### Task 5.1.1: MSW Installation and Configuration

- [ ] Install `msw`, `@mswjs/data`, `@mswjs/http-middleware`
- [ ] Install `@ngneat/falso` (fake data generation)
- [ ] Generate Service Worker with `npx msw init public/ --save`

#### Task 5.1.2: Create In-Memory DB

- [ ] Create `src/testing/mocks/db.ts`
- [ ] Define models with `@mswjs/data`
  - [ ] `user` model (corresponding to User type)
  - [ ] `team` model (corresponding to Team type)
  - [ ] `discussion` model (corresponding to Discussion type)
  - [ ] `comment` model (corresponding to Comment type)
- [ ] Configure relationships (foreign keys)
- [ ] Create initial data generation function `initializeDb()`

#### Task 5.1.3: Data Generation Utilities

- [ ] Create `src/testing/data-generators.ts`
- [ ] Generator functions using `@ngneat/falso`
  - [ ] `generateUser()`
  - [ ] `generateTeam()`
  - [ ] `generateDiscussion()`
  - [ ] `generateComment()`

#### Task 5.1.4: Create API Handlers

- [ ] Create `src/testing/mocks/handlers/auth.ts`
  - [ ] `POST /auth/login` - Login processing
  - [ ] `POST /auth/register` - Registration processing
  - [ ] `POST /auth/logout` - Logout processing
  - [ ] `GET /auth/me` - Get current user
- [ ] Create `src/testing/mocks/handlers/discussions.ts`
  - [ ] `GET /discussions` - Get list
  - [ ] `GET /discussions/:id` - Get details
  - [ ] `POST /discussions` - Create
  - [ ] `PATCH /discussions/:id` - Update
  - [ ] `DELETE /discussions/:id` - Delete
- [ ] Create `src/testing/mocks/handlers/comments.ts`
  - [ ] `GET /comments?discussionId=:id` - Get list
  - [ ] `POST /comments` - Create
  - [ ] `DELETE /comments/:id` - Delete
- [ ] Create `src/testing/mocks/handlers/users.ts`
  - [ ] `GET /users` - Get list (admin only)
  - [ ] `PATCH /profile` - Update profile
  - [ ] `DELETE /users/:id` - Delete (admin only)
- [ ] Create `src/testing/mocks/handlers/teams.ts`
  - [ ] `GET /teams` - Get list

#### Task 5.1.5: MSW Worker Configuration

- [ ] Create `src/testing/mocks/browser.ts`
  - [ ] Browser Service Worker configuration
  - [ ] Register all handlers
- [ ] Create `src/testing/mocks/server.ts`
  - [ ] Node.js MSW Server configuration
  - [ ] Register all handlers

#### Task 5.1.6: Test Setup

- [ ] Update `src/testing/setup-tests.ts`
  - [ ] MSW Server start/stop/reset
  - [ ] `beforeAll`, `afterEach`, `afterAll` hooks
  - [ ] DB initialization

#### Task 5.1.7: Enable Mock in Development Environment

- [ ] Update `src/main.ts`
  - [ ] Check environment variable `VITE_APP_ENABLE_API_MOCKING`
  - [ ] Start MSW Browser Worker if `true`
  - [ ] Await `worker.start()` before app startup

---

### 5.2 Test Utilities

**Tasks**:

#### Task 5.2.1: Custom Render Function

- [ ] Create `src/testing/test-utils.ts`
- [ ] Implement `renderWithProviders` function
  - [ ] Wrap Vue Test Utils' `mount`
  - [ ] Setup Pinia store
  - [ ] Setup Vue Router mock
  - [ ] Setup Vue Query QueryClient
  - [ ] Set initial state (logged-in user, etc.)
- [ ] `createWrapper` helper function (Provider wrapper)

#### Task 5.2.2: Mock Utilities

- [ ] Create `src/testing/mocks/utils.ts`
- [ ] Authentication state mock functions
  - [ ] `authenticate(user)` - Set logged-in state with specified user
  - [ ] `unauthenticate()` - Set logged-out state
- [ ] API response mock functions
  - [ ] `mockApiSuccess(data)`
  - [ ] `mockApiError(status, message)`

---

### 5.3 Component Tests

**Tasks**:

#### Task 5.3.1: UI Component Tests

- [ ] `Button.spec.ts` - Button component
  - [ ] Rendering of each variant
  - [ ] Click events
  - [ ] Loading state
  - [ ] Disabled state
- [ ] `Input.spec.ts` - Input component
  - [ ] v-model binding
  - [ ] Validation error display
  - [ ] Disabled state
- [ ] `Table.spec.ts` - Table component
  - [ ] Data display
  - [ ] Pagination
  - [ ] Empty state
- [ ] `Dialog.spec.ts` - Dialog component
  - [ ] Open/close behavior
  - [ ] Keyboard operations (Escape)
- [ ] `Notifications.spec.ts` - Notifications component
  - [ ] Notification display
  - [ ] Auto-removal
  - [ ] Close button
- [ ] Create tests for all other UI components

#### Task 5.3.2: Feature Component Tests

- [ ] `LoginForm.spec.ts`
  - [ ] Form input
  - [ ] Validation errors
  - [ ] Login success
  - [ ] Login failure
- [ ] `RegisterForm.spec.ts`
  - [ ] Form input
  - [ ] Team selection
  - [ ] Registration success
  - [ ] Registration failure
- [ ] `DiscussionsList.spec.ts`
  - [ ] List display
  - [ ] Pagination
  - [ ] Loading state
  - [ ] Error state
- [ ] `CreateDiscussion.spec.ts`
  - [ ] Form input
  - [ ] Creation success
  - [ ] Creation failure
- [ ] `CommentsList.spec.ts`
  - [ ] List display
  - [ ] Infinite scroll
  - [ ] Loading state
- [ ] Create tests for all other feature components

#### Task 5.3.3: Composables Tests

- [ ] `useAuth.spec.ts`
  - [ ] Login
  - [ ] Logout
  - [ ] Get user
- [ ] `useAuthorization.spec.ts`
  - [ ] Role check
  - [ ] Policy check

---

### 5.4 E2E Tests

**Directory Structure**:

```
/e2e/tests/
├── auth.setup.ts        # Authentication setup
├── smoke.spec.ts        # Smoke tests
├── auth.spec.ts         # Authentication flow
├── discussions.spec.ts  # Discussions CRUD
├── comments.spec.ts     # Comments feature
├── profile.spec.ts      # Profile editing
└── users.spec.ts        # User management (admin)
```

**Tasks**:

#### Task 5.4.1: Authentication Setup

- [ ] Create `e2e/tests/auth.setup.ts`
- [ ] Login with test user
- [ ] Save authentication state (Playwright storage feature)

#### Task 5.4.2: Smoke Tests

- [ ] Create `e2e/tests/smoke.spec.ts`
- [ ] Verify navigation to all major pages
- [ ] Verify pages render correctly

#### Task 5.4.3: Authentication Flow Tests

- [ ] Create `e2e/tests/auth.spec.ts`
- [ ] Login flow
  - [ ] Access login page
  - [ ] Form input
  - [ ] After successful login, redirect to dashboard
- [ ] Registration flow
  - [ ] Access registration page
  - [ ] Form input
  - [ ] After successful registration, redirect to dashboard
- [ ] Logout flow

#### Task 5.4.4: Discussions Feature Tests

- [ ] Create `e2e/tests/discussions.spec.ts`
- [ ] Display discussion list
- [ ] Discussion creation flow
- [ ] Discussion detail page display
- [ ] Discussion editing flow
- [ ] Discussion deletion flow
- [ ] Pagination behavior

#### Task 5.4.5: Comments Feature Tests

- [ ] Create `e2e/tests/comments.spec.ts`
- [ ] Display comments list
- [ ] Comment creation flow
- [ ] Comment deletion flow
- [ ] Infinite scroll behavior

#### Task 5.4.6: Profile Editing Tests

- [ ] Create `e2e/tests/profile.spec.ts`
- [ ] Access profile page
- [ ] Profile editing flow
- [ ] Verify saved changes

#### Task 5.4.7: User Management Tests (Admin)

- [ ] Create `e2e/tests/users.spec.ts`
- [ ] Login as admin
- [ ] Display user list
- [ ] User deletion flow
- [ ] Verify access denied for non-admin users

---

## Phase 6: Developer Experience Improvement (1 week)

### 6.1 ESLint Rules

**Tasks**:

#### Task 6.1.1: Add Import Restriction Rules

- [ ] Update `eslint.config.js`
- [ ] Install `eslint-plugin-import` (check existing)
- [ ] Configure import restriction rules

  ```javascript
  {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // app can import from features, components, lib, utils
          { target: './src/app', from: './src/app' },

          // features can't import from other features
          {
            target: './src/features',
            from: './src/features',
            except: ['./index.ts'],
          },

          // features can't import from app
          { target: './src/features', from: './src/app' },

          // components can't import from features or app
          { target: './src/components', from: './src/features' },
          { target: './src/components', from: './src/app' },

          // lib can't import from features or app
          { target: './src/lib', from: './src/features' },
          { target: './src/lib', from: './src/app' },
        ],
      },
    ],
  }
  ```

#### Task 6.1.2: Configure Naming Rules

- [ ] Enforce KEBAB_CASE for file names (custom rule or lint-staged)
- [ ] Enforce KEBAB_CASE for folder names

#### Task 6.1.3: Configure Import Order

- [ ] Enforce import order with `eslint-plugin-import`

  ```javascript
  'import/order': [
    'error',
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
      ],
      'newlines-between': 'always',
      alphabetize: { order: 'asc' },
    },
  ]
  ```

#### Task 6.1.4: Other Rules

- [ ] Tailwind CSS class order (`prettier-plugin-tailwindcss`)
- [ ] a11y rules (`eslint-plugin-vuejs-accessibility`)
- [ ] Testing Library rules (check existing)

---

### 6.2 Code Generator

**Directory Structure**:

```
/generators/
└── component/
    ├── component.vue.hbs
    ├── component.spec.ts.hbs
    ├── component.stories.ts.hbs
    ├── index.ts.hbs
    └── prompt.js
```

**Tasks**:

#### Task 6.2.1: Plop Configuration

- [ ] Install `plop` (check existing)
- [ ] Create/update `plopfile.cjs`
- [ ] Component generation configuration
  - [ ] Prompts (component name, location)
  - [ ] Template file paths
  - [ ] Output destination paths

#### Task 6.2.2: Create Templates

- [ ] Create `generators/component/component.vue.hbs`

  ```handlebars
  <script setup lang="ts">
  // Component logic here
  </script>

  <template>
    <div>{{ name }}</div>
  </template>
  ```

- [ ] Create `generators/component/component.spec.ts.hbs`

  ```handlebars
  import { describe, it, expect } from 'vitest'
  import { mount } from '@vue/test-utils'
  import {{ pascalCase name }} from './{{ kebabCase name }}.vue'

  describe('{{ pascalCase name }}', () => {
    it('renders properly', () => {
      const wrapper = mount({{ pascalCase name }})
      expect(wrapper.exists()).toBe(true)
    })
  })
  ```

- [ ] Create `generators/component/component.stories.ts.hbs`

  ```handlebars
  import type { Meta, StoryObj } from '@storybook/vue3'
  import {{ pascalCase name }} from './{{ kebabCase name }}.vue'

  const meta: Meta<typeof {{ pascalCase name }}> = {
    component: {{ pascalCase name }},
  }

  export default meta
  type Story = StoryObj<typeof {{ pascalCase name }}>

  export const Default: Story = {}
  ```

- [ ] Create `generators/component/index.ts.hbs`

  ```handlebars
  export { default as {{ pascalCase name }} } from './{{ kebabCase name }}.vue'
  ```

#### Task 6.2.3: Add Scripts

- [ ] Add script to `package.json`

  ```json
  "scripts": {
    "generate:component": "plop component"
  }
  ```

---

### 6.3 Git Hooks

**Directory Structure**:

```
/.husky/
├── pre-commit           # Run lint-staged
└── commit-msg           # Run commitlint
```

**Tasks**:

#### Task 6.3.1: Husky Setup

- [ ] Install `husky` (check existing)
- [ ] Initialize Husky with `pnpm exec husky init`

#### Task 6.3.2: lint-staged Configuration

- [ ] Install `lint-staged`
- [ ] Add configuration to `package.json`

  ```json
  "lint-staged": {
    "*.{js,ts,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
  ```

- [ ] Create `.husky/pre-commit`

  ```bash
  pnpm exec lint-staged
  ```

#### Task 6.3.3: commitlint Configuration

- [ ] Install `@commitlint/cli`, `@commitlint/config-conventional`
- [ ] Create `commitlint.config.js`

  ```javascript
  module.exports = {
    extends: ['@commitlint/config-conventional'],
  }
  ```

- [ ] Create `.husky/commit-msg`

  ```bash
  pnpm exec commitlint --edit $1
  ```

#### Task 6.3.4: Add Test Hook (Optional)

- [ ] Create `.husky/pre-push`

  ```bash
  pnpm test:unit
  ```

---

## Phase 7: Final Adjustments and Documentation (1-2 weeks)

### 7.1 Environment Variables and Deployment Preparation

**Tasks**:

#### Task 7.1.1: Environment Variables Documentation

- [ ] Create `.env.example`

  ```
  VITE_APP_API_URL=http://localhost:8080/api
  VITE_APP_ENABLE_API_MOCKING=false
  ```

- [ ] Add environment variable descriptions to README

#### Task 7.1.2: Build Configuration Optimization

- [ ] Optimize chunk splitting in `vite.config.ts`
- [ ] Check bundle size (`pnpm build && pnpm preview`)
- [ ] Check Lighthouse score

---

### 7.2 Documentation Creation

**Tasks**:

#### Task 7.2.1: Update README

- [ ] Project overview
- [ ] Installation instructions
- [ ] Development server startup method
- [ ] Test execution method
- [ ] Build method
- [ ] Environment variable descriptions
- [ ] Code generator usage
- [ ] Deployment method

#### Task 7.2.2: Architecture Documentation

- [ ] Create `docs/architecture.md`
  - [ ] Feature-Sliced Design explanation
  - [ ] Directory structure explanation
  - [ ] Dependency rules
  - [ ] ESLint rules explanation

#### Task 7.2.3: Contribution Guide

- [ ] Create `CONTRIBUTING.md`
  - [ ] Branch strategy
  - [ ] Commit message conventions
  - [ ] PR process
  - [ ] Code review criteria

---

### 7.3 Final Testing and Review

**Tasks**:

#### Task 7.3.1: Manual Testing of All Features

- [ ] Login/logout
- [ ] Discussion CRUD
- [ ] Comment CRUD
- [ ] Profile editing
- [ ] User management (admin)
- [ ] Permission checks
- [ ] Responsive design
- [ ] Browser compatibility (Chrome, Firefox, Safari)

#### Task 7.3.2: Performance Testing

- [ ] Lighthouse score (Performance, Accessibility, Best Practices, SEO)
- [ ] Bundle size check
- [ ] Initial load time
- [ ] Page transition speed

#### Task 7.3.3: Accessibility Check

- [ ] Keyboard operations
- [ ] Screen reader support
- [ ] Color contrast
- [ ] ARIA labels

#### Task 7.3.4: Code Review

- [ ] Resolve ESLint errors/warnings
- [ ] Resolve TypeScript errors
- [ ] Remove code duplication
- [ ] Remove unused code
- [ ] Organize comments/TODOs

---

## Technology Stack Comparison

| Category | React Version | Vue Version | Migration Difficulty | Approach |
|---------|---------|-------|----------|---------|
| **Framework** | React 18.3 | Vue 3.5 | ⚠️ Medium | Composition API + `<script setup>` |
| **Routing** | React Router 7 | Vue Router 4 | ⚠️ Medium | `beforeEach`/`beforeResolve` guards |
| **State Management** | Zustand | Pinia | ✅ Easy | Almost the same API |
| **Data Fetching** | TanStack Query | @tanstack/vue-query | ✅ Easy | Almost the same API |
| **Forms** | React Hook Form | VeeValidate | ⚠️ Medium | API relearning required |
| **Validation** | Zod | Zod | ✅ Same | Can be used as is |
| **UI Primitives** | Radix UI | Radix Vue | ✅ Easy | Almost the same API |
| **HTTP** | Axios | Axios | ✅ Same | Can be used as is |
| **Styling** | Tailwind | Tailwind | ✅ Same | Can be used as is |
| **Testing** | Vitest + Playwright | Vitest + Playwright | ✅ Same | Same test strategy |
| **Mocking** | MSW | MSW | ✅ Same | Handlers as is |
| **Build Tool** | Vite | Vite | ✅ Same | Can be used as is |
| **Authentication** | react-query-auth | Custom implementation | 🔴 Hard | composable + Pinia |
| **SEO** | react-helmet-async | @unhead/vue | ⚠️ Medium | API learning required |

---

## Effort Estimation (Total 13-20 weeks)

| Phase | Tasks | Task Count | Effort |
|-------|--------|---------|------|
| 1 | Infrastructure layer | 12 | 1-2 weeks |
| 2 | UI components | 23 | 2-3 weeks |
| 3 | Feature modules | 26 | 4-6 weeks |
| 4 | Routing | 14 | 2 weeks |
| 5 | Testing | 19 | 2-3 weeks |
| 6 | DX improvement | 12 | 1 week |
| 7 | Final adjustments | 11 | 1-2 weeks |
| **Total** | | **117 tasks** | **13-20 weeks** |

---

## Recommended Implementation Order

### Week 1-2: Foundation Construction

- [ ] Phase 1.1: API Client Layer (Tasks 1.1.1-1.1.2)
- [ ] Phase 1.2: Authentication System (Tasks 1.2.1-1.2.3)
- [ ] Phase 1.3: Environment Configuration (Tasks 1.3.1-1.3.2)

### Week 3-5: Form & Feedback Components

- [ ] Phase 2.1: Form Components (Tasks 2.1.1-2.1.9)
- [ ] Phase 2.2: Feedback Components (Tasks 2.2.1-2.2.5)

### Week 6: Layout & Other UI

- [ ] Phase 2.3: Layout Components (Tasks 2.3.1-2.3.3)
- [ ] Phase 2.4: Other UI Components (Tasks 2.4.1-2.4.3)

### Week 7-9: Discussions Feature (Most Important)

- [ ] Phase 3.1: Discussions Feature (Tasks 3.1.1-3.1.6)

### Week 10-11: Comments & Users Features

- [ ] Phase 3.2: Comments Feature (Tasks 3.2.1-3.2.5)
- [ ] Phase 3.3: Users Feature (Tasks 3.3.1-3.3.4)

### Week 12: Teams & Auth Features

- [ ] Phase 3.4: Teams Feature (Task 3.4.1)
- [ ] Phase 3.5: Auth Feature (Tasks 3.5.1-3.5.2)

### Week 13-14: Routing

- [ ] Phase 4.1: Route Structure (Tasks 4.1.1-4.1.10)
- [ ] Phase 4.2: Route Configuration (Tasks 4.2.1-4.2.4)

### Week 15-17: Test Implementation

- [ ] Phase 5.1: MSW Setup (Tasks 5.1.1-5.1.7)
- [ ] Phase 5.2: Test Utilities (Tasks 5.2.1-5.2.2)
- [ ] Phase 5.3: Component Tests (Tasks 5.3.1-5.3.3)
- [ ] Phase 5.4: E2E Tests (Tasks 5.4.1-5.4.7)

### Week 18: Developer Experience Improvement

- [ ] Phase 6.1: ESLint Rules (Tasks 6.1.1-6.1.4)
- [ ] Phase 6.2: Code Generator (Tasks 6.2.1-6.2.3)
- [ ] Phase 6.3: Git Hooks (Tasks 6.3.1-6.3.4)

### Week 19-20: Final Adjustments

- [ ] Phase 7.1: Deployment Preparation + Cloudflare Migration (Tasks 7.1.1-7.1.3)
- [ ] Phase 7.2: Documentation (Tasks 7.2.1-7.2.3)
- [ ] Phase 7.3: Final Testing (Tasks 7.3.1-7.3.4)

---

## Maintaining Architecture Principles

Maintain the following React version principles in Vue version:

✅ **Feature-Sliced Design**: Complete separation by feature
✅ **Unidirectional Dependencies**: ESLint enforcement (app → features → components/lib/utils)
✅ **No Cross-Feature Imports**: No direct imports between features
✅ **KEBAB_CASE Naming**: File/folder naming convention
✅ **Type Safety**: Strict TypeScript configuration (strict mode)
✅ **Comprehensive Testing**: MSW + Vitest + Playwright
✅ **Policy-Based Authorization**: Function-based authorization system
✅ **Query Options Pattern**: Standardized data fetching
✅ **Component Composition**: Headless components with Radix Vue
✅ **Tailwind + CVA**: Utility-first styling

---

## Risk Management

### High-Risk Items

1. **VeeValidate Learning Curve**
   - API significantly different from React Hook Form
   - Countermeasure: Start form implementation early, read documentation thoroughly

2. **React Router Loaders → Vue Router Guards**
   - Different patterns for data preloading
   - Countermeasure: Verify Suspense pattern, implement prototype

3. **Custom Authentication System Implementation**
   - No Vue version of react-query-auth
   - Countermeasure: Careful design with composable + Pinia

4. **Test Effort Estimation**
   - 19 out of 116 tasks are test-related
   - Countermeasure: Create tests in parallel with each feature implementation

### Medium-Risk Items

5. **ESLint Rule Migration**
   - Adapt React-specific rules to Vue
   - Countermeasure: Utilize eslint-plugin-vue

6. **Type Definition Consistency**
   - Use existing type definitions across all features
   - Countermeasure: Finalize type definitions early, reflect changes across entire codebase

---

## Success Criteria

### Functionality

- [ ] All CRUD operations work
- [ ] Authentication/authorization functions correctly
- [ ] Pagination/infinite scroll works
- [ ] Error handling is appropriate

### Quality

- [ ] Unit test coverage > 80%
- [ ] All E2E tests pass
- [ ] Zero ESLint errors/warnings
- [ ] Zero TypeScript errors

### Performance

- [ ] Lighthouse Performance > 90
- [ ] Initial load < 3 seconds
- [ ] Bundle size < 500KB (gzip)

### Developer Experience

- [ ] Code generator works
- [ ] Git Hooks work
- [ ] All components viewable in Storybook
- [ ] Documentation complete

---

## Next Steps

1. **Team review of this document**
2. **Adjust effort estimation**
3. **Reconfirm priorities**
4. **Start Phase 1** 🚀
