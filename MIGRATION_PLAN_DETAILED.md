# React to Vue Migration Plan - Detailed PR-Level Tasks

> **1 PR = 1-2 hours of work** as a baseline for task breakdown

## 📊 Overview

- **Total PRs**: Approximately 180-200
- **Total Effort**: 12-19 weeks (1 person full-time)
- **Parallel Work**: Many tasks can be executed in parallel by multiple people

---

## Phase 1: Infrastructure Layer (12-15 PRs / 1-2 weeks)

### 1.1 API Client Layer (6 PRs)

#### PR 1.1.1: Add Project Dependencies

**Estimated Time**: 30 minutes

- [ ] Install `axios`
- [ ] Install `@tanstack/vue-query`
- [ ] Verify `package.json` update

#### PR 1.1.2: Create Axios Basic Configuration

**Estimated Time**: 1 hour

- [ ] Create `src/lib/api-client.ts`
- [ ] Create Axios instance (baseURL, withCredentials configuration)
- [ ] Basic type definitions (ApiClient, ApiError)
- [ ] Export

#### PR 1.1.3: Axios Request Interceptor

**Estimated Time**: 1 hour

- [ ] Implement request interceptor
- [ ] Automatic authentication token attachment logic
- [ ] Header configuration
- [ ] Add tests

#### PR 1.1.4: Axios Response Interceptor

**Estimated Time**: 1.5 hours

- [ ] Implement response interceptor
- [ ] Automatic response data unwrapping
- [ ] Basic error handling
- [ ] Add tests

#### PR 1.1.5: Vue Query Basic Configuration

**Estimated Time**: 1 hour

- [ ] Create `src/lib/vue-query.ts`
- [ ] Create QueryClient
- [ ] Configure default options (staleTime, cacheTime, retry)
- [ ] Type definitions

#### PR 1.1.6: Vue Query Provider Integration

**Estimated Time**: 1 hour

- [ ] Update `src/app/provider.ts`
- [ ] Add QueryClientProvider
- [ ] Configure Vue Query Devtools (development environment only)
- [ ] Verify integration in `main.ts`

---

### 1.2 Authentication System (6 PRs)

#### PR 1.2.1: Create Authentication Pinia Store

**Estimated Time**: 1.5 hours

- [ ] Create `src/stores/auth.ts`
- [ ] Define store state (user, isAuthenticated)
- [ ] Basic actions (setUser, clearUser)
- [ ] Add tests

#### PR 1.2.2: Authentication API Type Definitions and Schemas

**Estimated Time**: 1 hour

- [ ] Create `src/features/auth/types/index.ts`
- [ ] LoginInput, RegisterInput type definitions
- [ ] Create Zod schemas
- [ ] Define AuthResponse type

#### PR 1.2.3: Implement Authentication API Functions

**Estimated Time**: 1.5 hours

- [ ] Create `src/lib/auth.ts`
- [ ] `POST /auth/login` API function
- [ ] `POST /auth/register` API function
- [ ] `POST /auth/logout` API function
- [ ] `GET /auth/me` API function

#### PR 1.2.4: Implement useAuth Composable

**Estimated Time**: 2 hours

- [ ] Create `useAuth` composable
- [ ] Implement login, register, logout functions
- [ ] useUser() - Get current user with Vue Query
- [ ] Error handling
- [ ] Add tests

#### PR 1.2.5: Basic Authorization System Implementation

**Estimated Time**: 1.5 hours

- [ ] Create `src/lib/authorization.ts`
- [ ] Role type definition ('ADMIN' | 'USER')
- [ ] Policy type definition
- [ ] Implement POLICIES object
- [ ] Add tests

#### PR 1.2.6: Authorization Composable & Component

**Estimated Time**: 2 hours

- [ ] Implement `useAuthorization` composable
- [ ] checkAccess, hasRole functions
- [ ] Create `Authorization.vue` component
- [ ] Props/Emits definition
- [ ] Add tests

---

### 1.3 Environment Configuration and Path Definition (3 PRs)

#### PR 1.3.1: Environment Variable Configuration

**Estimated Time**: 1 hour

- [ ] Create `.env.example`
- [ ] Create `src/config/env.ts`
- [ ] Validate environment variables with Zod schema
- [ ] Export type-safe env object
- [ ] Error handling

#### PR 1.3.2: Create Path Definitions

**Estimated Time**: 1 hour

- [ ] Create `src/config/paths.ts`
- [ ] Define path object (home, auth, app)
- [ ] Implement getHref() methods
- [ ] Type definitions

#### PR 1.3.3: Integrate Environment Variables and Router

**Estimated Time**: 30 minutes

- [ ] Use env in api-client
- [ ] Verify configuration works
- [ ] Update documentation

---

## Phase 2: UI Component Expansion (35-40 PRs / 2-3 weeks)

### 2.1 Form Components (18 PRs)

#### PR 2.1.1: Add VeeValidate Dependencies

**Estimated Time**: 30 minutes

- [ ] Install `vee-validate`
- [ ] Install `@vee-validate/zod`
- [ ] Add global configuration (as needed)

#### PR 2.1.2: Basic Form Component Implementation

**Estimated Time**: 2 hours

- [ ] Create `src/components/ui/form/Form.vue`
- [ ] Define Props (schema, initialValues)
- [ ] Integrate VeeValidate useForm
- [ ] Define slots
- [ ] Basic styling

#### PR 2.1.3: Form Component Submission Processing

**Estimated Time**: 1.5 hours

- [ ] Implement form submission processing
- [ ] Error handling
- [ ] Loading state management
- [ ] Define Emits

#### PR 2.1.4: Form Component Tests and Storybook

**Estimated Time**: 1.5 hours

- [ ] Create Storybook stories
- [ ] Create Vitest unit tests
- [ ] Create index file

#### PR 2.1.5: Create Input Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/components/ui/input/Input.vue`
- [ ] Define Props (type, placeholder, disabled, readonly, modelValue)
- [ ] Integrate with VeeValidate useField
- [ ] Basic styling

#### PR 2.1.6: Input Component Error Display

**Estimated Time**: 1 hour

- [ ] Error state styling
- [ ] Error message display
- [ ] Accessibility support (aria-invalid, aria-describedby)

#### PR 2.1.7: Input Component Tests and Storybook

**Estimated Time**: 1.5 hours

- [ ] Create Storybook stories (all variants)
- [ ] Create Vitest unit tests
- [ ] Create index file

#### PR 2.1.8: Create Textarea Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/components/ui/textarea/Textarea.vue`
- [ ] Define Props (rows, placeholder, disabled, readonly, modelValue)
- [ ] VeeValidate integration
- [ ] Basic styling

#### PR 2.1.9: Textarea Component Tests and Storybook

**Estimated Time**: 1.5 hours

- [ ] Implement auto-resize feature (optional)
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests
- [ ] Create index file

#### PR 2.1.10: Create Label Component

**Estimated Time**: 1 hour

- [ ] Create `src/components/ui/label/Label.vue`
- [ ] Integrate Radix Vue Label
- [ ] Define Props (required, htmlFor)
- [ ] Required mark display feature
- [ ] Basic styling
- [ ] Create index file

#### PR 2.1.11: Create FieldWrapper Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/components/ui/field-wrapper/FieldWrapper.vue`
- [ ] Define Props (label, error, description, required)
- [ ] Implement layout
- [ ] Error state styling

#### PR 2.1.12: FieldWrapper Component Tests and Storybook

**Estimated Time**: 1 hour

- [ ] Create Storybook stories
- [ ] Create Vitest unit tests
- [ ] Create index file

#### PR 2.1.13: Basic Select Component Implementation

**Estimated Time**: 2 hours

- [ ] Verify/install Radix Vue Select
- [ ] Create `src/components/ui/select/Select.vue` (root)
- [ ] Create `SelectTrigger.vue`, `SelectContent.vue`, `SelectItem.vue`
- [ ] Basic styling

#### PR 2.1.14: Select Component VeeValidate Integration

**Estimated Time**: 1.5 hours

- [ ] VeeValidate integration
- [ ] Error state styling
- [ ] Create tests and Storybook
- [ ] Create index file

#### PR 2.1.15: Create Checkbox Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/components/ui/checkbox/Checkbox.vue`
- [ ] Use Radix Vue Checkbox
- [ ] VeeValidate integration
- [ ] Label integration
- [ ] Basic styling

#### PR 2.1.16: Checkbox Component Tests and Storybook

**Estimated Time**: 1 hour

- [ ] Create Storybook stories
- [ ] Create Vitest unit tests
- [ ] Create index file

#### PR 2.1.17: Create Switch Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/components/ui/switch/Switch.vue`
- [ ] Use Radix Vue Switch
- [ ] VeeValidate integration
- [ ] Basic styling

#### PR 2.1.18: Switch Component Tests and Storybook

**Estimated Time**: 1 hour

- [ ] Create Storybook stories
- [ ] Create Vitest unit tests
- [ ] Create index file

---

### 2.2 Feedback Components (12 PRs)

#### PR 2.2.1: Create Notifications Pinia Store

**Estimated Time**: 1.5 hours

- [ ] Create `src/stores/notifications.ts`
- [ ] Notification type definition
- [ ] Store state and actions
- [ ] Auto-removal feature (after 5 seconds)
- [ ] Add tests

#### PR 2.2.2: Notification Individual Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/components/ui/notifications/Notification.vue`
- [ ] Type-based styling (info, success, warning, error)
- [ ] Close button
- [ ] Animation

#### PR 2.2.3: Notifications Container Component

**Estimated Time**: 1 hour

- [ ] Create `src/components/ui/notifications/Notifications.vue`
- [ ] Integrate with notifications store
- [ ] Display notification list (fixed position)
- [ ] Enter/Leave animation

#### PR 2.2.4: Notifications Integration and Storybook

**Estimated Time**: 1 hour

- [ ] Add Notifications component to `src/app/provider.ts`
- [ ] Create Storybook stories
- [ ] Add tests
- [ ] Create index file

#### PR 2.2.5: Create Dialog Basic Component Group

**Estimated Time**: 2 hours

- [ ] Verify/install Radix Vue Dialog
- [ ] Create `src/components/ui/dialog/Dialog.vue` (root)
- [ ] Create `DialogContent.vue`, `DialogOverlay.vue`
- [ ] Basic styling
- [ ] Accessibility support

#### PR 2.2.6: Create Dialog Sub-components

**Estimated Time**: 1.5 hours

- [ ] Create `DialogHeader.vue`, `DialogTitle.vue`
- [ ] Create `DialogDescription.vue`, `DialogFooter.vue`
- [ ] Styling integration
- [ ] Create index file

#### PR 2.2.7: Dialog Component Tests and Storybook

**Estimated Time**: 1.5 hours

- [ ] Animation (Tailwind Animate)
- [ ] Keyboard operation tests (Escape)
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests

#### PR 2.2.8: Create ConfirmationDialog Component

**Estimated Time**: 2 hours

- [ ] Create `src/components/ui/confirmation-dialog/ConfirmationDialog.vue`
- [ ] Define Props (open, title, body, confirmText, cancelText, isDone, isLoading)
- [ ] Define Emits (confirm, cancel)
- [ ] Implementation using Dialog component

#### PR 2.2.9: ConfirmationDialog Tests and Storybook

**Estimated Time**: 1 hour

- [ ] Implement loading state
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests
- [ ] Create index file

#### PR 2.2.10: Create Dropdown Basic Component Group

**Estimated Time**: 2 hours

- [ ] Verify/install Radix Vue DropdownMenu
- [ ] Create `src/components/ui/dropdown/Dropdown.vue` (root)
- [ ] Create `DropdownTrigger.vue`, `DropdownContent.vue`
- [ ] Create `DropdownItem.vue`
- [ ] Basic styling

#### PR 2.2.11: Dropdown Additional Features and Accessibility

**Estimated Time**: 1 hour

- [ ] Create `DropdownSeparator.vue`
- [ ] Keyboard navigation support
- [ ] Create index file

#### PR 2.2.12: Dropdown Component Tests and Storybook

**Estimated Time**: 1.5 hours

- [ ] Create Storybook stories (multiple patterns)
- [ ] Create Vitest unit tests
- [ ] Accessibility tests

---

### 2.3 Layout Components (6 PRs)

#### PR 2.3.1: Create AuthLayout Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/components/layouts/auth-layout.vue`
- [ ] Center-aligned layout
- [ ] Logo display
- [ ] `<RouterView>` integration
- [ ] Basic styling

#### PR 2.3.2: AuthLayout Responsive Support and Tests

**Estimated Time**: 1 hour

- [ ] Implement responsive design
- [ ] Mobile support
- [ ] Create Storybook stories
- [ ] Add tests

#### PR 2.3.3: DashboardLayout Basic Structure

**Estimated Time**: 2 hours

- [ ] Create `src/components/layouts/dashboard-layout.vue`
- [ ] Create sidebar structure
- [ ] Logo area
- [ ] Navigation link structure
- [ ] Main content area

#### PR 2.3.4: DashboardLayout Navigation Implementation

**Estimated Time**: 1.5 hours

- [ ] Implement navigation links (Discussions, Users, Profile)
- [ ] Active state highlighting
- [ ] Router integration

#### PR 2.3.5: DashboardLayout Header and User Menu

**Estimated Time**: 2 hours

- [ ] Implement header
- [ ] User menu (use Dropdown component)
- [ ] Logout button
- [ ] Integration with useAuth

#### PR 2.3.6: DashboardLayout Responsive Support

**Estimated Time**: 2 hours

- [ ] Mobile support (hamburger menu)
- [ ] Responsive design
- [ ] Create Storybook stories
- [ ] Add tests

#### PR 2.3.7: Create ContentLayout Component

**Estimated Time**: 1 hour

- [ ] Create `src/components/layouts/content-layout.vue`
- [ ] Define Props (title)
- [ ] Display page title
- [ ] Display content via slot
- [ ] Basic styling
- [ ] Create Storybook stories

---

### 2.4 Other UI Components (6 PRs)

#### PR 2.4.1: Create Error Component

**Estimated Time**: 1 hour

- [ ] Create `src/components/ui/error/Error.vue`
- [ ] Define Props (error: Error | string)
- [ ] Display error message
- [ ] Error icon
- [ ] Styling (red theme)

#### PR 2.4.2: Error Component Tests and Storybook

**Estimated Time**: 1 hour

- [ ] Create Storybook stories
- [ ] Create Vitest unit tests
- [ ] Create index file

#### PR 2.4.3: unhead Setup

**Estimated Time**: 1 hour

- [ ] Install `@unhead/vue`
- [ ] Configure `createHead()` in `src/app/provider.ts`
- [ ] Verify basic configuration

#### PR 2.4.4: Create Head (SEO) Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/components/ui/seo/Head.vue`
- [ ] Define Props (title, description)
- [ ] Use `useHead` composable
- [ ] Set page title
- [ ] Set meta description
- [ ] Create index file

#### PR 2.4.5: Create FormDrawer Component

**Estimated Time**: 2 hours

- [ ] Create `src/components/ui/form-drawer/FormDrawer.vue`
- [ ] Define Props (open, title, submitText, isLoading)
- [ ] Define Emits (close, submit)
- [ ] Use Drawer component
- [ ] Form slot
- [ ] Submit/cancel buttons

#### PR 2.4.6: FormDrawer Tests and Storybook

**Estimated Time**: 1 hour

- [ ] Implement loading state
- [ ] Create Storybook stories
- [ ] Create Vitest unit tests
- [ ] Create index file

---

## Phase 3: Feature Module Implementation (50-60 PRs / 4-6 weeks)

### 3.1 Discussions Feature (18 PRs)

#### PR 3.1.1: Create Discussions Type Definitions

**Estimated Time**: 30 minutes

- [ ] Create `src/features/discussions/types/index.ts`
- [ ] Discussion, DiscussionInput type definitions
- [ ] Create Zod schemas

#### PR 3.1.2: getDiscussions API Function

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/discussions/api/get-discussions.ts`
- [ ] `GET /discussions` API call
- [ ] Pagination support (page parameter)
- [ ] Response type definition

#### PR 3.1.3: getDiscussionsQueryOptions Function

**Estimated Time**: 1 hour

- [ ] Create `getDiscussionsQueryOptions` function
- [ ] Configure queryKey, queryFn for Vue Query
- [ ] Add tests

#### PR 3.1.4: getDiscussion API Function

**Estimated Time**: 1 hour

- [ ] Create `src/features/discussions/api/get-discussion.ts`
- [ ] `GET /discussions/:id` API call
- [ ] `getDiscussionQueryOptions` function
- [ ] Add tests

#### PR 3.1.5: createDiscussion API Function and Mutation

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/discussions/api/create-discussion.ts`
- [ ] `POST /discussions` API call
- [ ] `useCreateDiscussion` mutation
- [ ] Add tests

#### PR 3.1.6: updateDiscussion API Function and Mutation

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/discussions/api/update-discussion.ts`
- [ ] `PATCH /discussions/:id` API call
- [ ] `useUpdateDiscussion` mutation
- [ ] Add tests

#### PR 3.1.7: deleteDiscussion API Function and Mutation

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/discussions/api/delete-discussion.ts`
- [ ] `DELETE /discussions/:id` API call
- [ ] `useDeleteDiscussion` mutation
- [ ] Add tests

#### PR 3.1.8: DiscussionsList Component Basic Structure

**Estimated Time**: 2 hours

- [ ] Create `src/features/discussions/components/discussions-list.vue`
- [ ] Define Props (page: number)
- [ ] Fetch data with `useQuery(getDiscussionsQueryOptions)`
- [ ] Integrate Table component
- [ ] Basic column definitions

#### PR 3.1.9: DiscussionsList Loading and Error States

**Estimated Time**: 1 hour

- [ ] Implement loading state
- [ ] Implement error state
- [ ] Implement empty state (no data)

#### PR 3.1.10: DiscussionsList Pagination and Prefetching

**Estimated Time**: 1.5 hours

- [ ] Implement pagination
- [ ] Prefetching (on hover next page)
- [ ] Add tests

#### PR 3.1.11: Create DiscussionView Component

**Estimated Time**: 2 hours

- [ ] Create `src/features/discussions/components/discussion-view.vue`
- [ ] Define Props (discussionId: string)
- [ ] Fetch data with `useQuery(getDiscussionQueryOptions)`
- [ ] Display discussion details (title, author, body)
- [ ] Display body with MDPreview

#### PR 3.1.12: DiscussionView Action Buttons

**Estimated Time**: 1 hour

- [ ] Add edit/delete buttons
- [ ] Permission check (integration with useAuthorization)
- [ ] Add tests

#### PR 3.1.13: Create CreateDiscussion Component

**Estimated Time**: 2 hours

- [ ] Create `src/features/discussions/components/create-discussion.vue`
- [ ] Create Zod schema (title, body)
- [ ] Use FormDrawer component
- [ ] Form using Form, Input, Textarea

#### PR 3.1.14: CreateDiscussion Mutation Integration

**Estimated Time**: 1.5 hours

- [ ] Integrate `useCreateDiscussion` mutation
- [ ] Handle success (notification, list update, close Drawer)
- [ ] Error handling
- [ ] Add tests

#### PR 3.1.15: Create UpdateDiscussion Component

**Estimated Time**: 2 hours

- [ ] Create `src/features/discussions/components/update-discussion.vue`
- [ ] Define Props (discussionId: string)
- [ ] Fetch existing data and set initial values
- [ ] Use FormDrawer component

#### PR 3.1.16: UpdateDiscussion Mutation Integration

**Estimated Time**: 1.5 hours

- [ ] Integrate `useUpdateDiscussion` mutation
- [ ] Handle success (notification, refetch data, close Drawer)
- [ ] Error handling
- [ ] Add tests

#### PR 3.1.17: Create DeleteDiscussion Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/discussions/components/delete-discussion.vue`
- [ ] Define Props (discussionId: string)
- [ ] Use ConfirmationDialog component
- [ ] Integrate `useDeleteDiscussion` mutation

#### PR 3.1.18: DeleteDiscussion Finishing and Tests

**Estimated Time**: 1 hour

- [ ] Handle success (notification, remove from list, close Dialog)
- [ ] Error handling
- [ ] Add tests

---

### 3.2 Comments Feature (15 PRs)

#### PR 3.2.1: Create Comments Type Definitions

**Estimated Time**: 30 minutes

- [ ] Create `src/features/comments/types/index.ts`
- [ ] Comment, CommentInput type definitions
- [ ] Create Zod schemas

#### PR 3.2.2: getComments API Function (Infinite Query)

**Estimated Time**: 2 hours

- [ ] Create `src/features/comments/api/get-comments.ts`
- [ ] `GET /comments?discussionId=:id` API call
- [ ] Infinite Query support (pageParam)
- [ ] Response type definition (nextCursor)

#### PR 3.2.3: getCommentsInfiniteQueryOptions Function

**Estimated Time**: 1.5 hours

- [ ] Create `getCommentsInfiniteQueryOptions` function
- [ ] Configure for Vue Query Infinite
- [ ] Add tests

#### PR 3.2.4: createComment API Function and Mutation

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/comments/api/create-comment.ts`
- [ ] `POST /comments` API call
- [ ] `useCreateComment` mutation
- [ ] Add tests

#### PR 3.2.5: deleteComment API Function and Mutation

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/comments/api/delete-comment.ts`
- [ ] `DELETE /comments/:id` API call
- [ ] `useDeleteComment` mutation
- [ ] Add tests

#### PR 3.2.6: CommentsList Component Basic Structure

**Estimated Time**: 2 hours

- [ ] Create `src/features/comments/components/comments-list.vue`
- [ ] Define Props (discussionId: string)
- [ ] Fetch data with `useInfiniteQuery(getCommentsInfiniteQueryOptions)`
- [ ] Display comment list

#### PR 3.2.7: CommentsList Comment Display

**Estimated Time**: 1.5 hours

- [ ] Display author information
- [ ] Display comment body (MDPreview)
- [ ] Display created date
- [ ] Basic styling

#### PR 3.2.8: CommentsList Delete Button and Permission Check

**Estimated Time**: 1.5 hours

- [ ] Add delete button
- [ ] Permission check (integration with useAuthorization)
- [ ] Integration with DeleteComment component

#### PR 3.2.9: CommentsList Infinite Scroll Implementation

**Estimated Time**: 2 hours

- [ ] Implement Intersection Observer
- [ ] "Load more" button (alternative)
- [ ] Implement loading state

#### PR 3.2.10: CommentsList Empty State and Tests

**Estimated Time**: 1 hour

- [ ] Implement empty state (no comments)
- [ ] Add tests

#### PR 3.2.11: Create Comments Container Component

**Estimated Time**: 1 hour

- [ ] Create `src/features/comments/components/comments.vue`
- [ ] Define Props (discussionId: string)
- [ ] Integrate CommentsList and CreateComment
- [ ] Layout

#### PR 3.2.12: Create CreateComment Component

**Estimated Time**: 2 hours

- [ ] Create `src/features/comments/components/create-comment.vue`
- [ ] Define Props (discussionId: string)
- [ ] Create Zod schema (body)
- [ ] Form using Form, Textarea

#### PR 3.2.13: CreateComment Mutation Integration

**Estimated Time**: 1.5 hours

- [ ] Integrate `useCreateComment` mutation
- [ ] Handle success (notification, update comment list, reset form)
- [ ] Error handling
- [ ] Add tests

#### PR 3.2.14: Create DeleteComment Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/comments/components/delete-comment.vue`
- [ ] Define Props (commentId: string)
- [ ] Authorization check (comment:delete policy)
- [ ] Use ConfirmationDialog component

#### PR 3.2.15: DeleteComment Mutation Integration and Tests

**Estimated Time**: 1.5 hours

- [ ] Integrate `useDeleteComment` mutation
- [ ] Handle success (notification, update comment list, close Dialog)
- [ ] Error handling
- [ ] Add tests

---

### 3.3 Users Feature (12 PRs)

#### PR 3.3.1: Create Users Type Definitions

**Estimated Time**: 30 minutes

- [ ] Create `src/features/users/types/index.ts`
- [ ] UpdateProfileInput type definition
- [ ] Create Zod schemas

#### PR 3.3.2: getUsers API Function

**Estimated Time**: 1 hour

- [ ] Create `src/features/users/api/get-users.ts`
- [ ] `GET /users` API call (admin only)
- [ ] `getUsersQueryOptions` function
- [ ] Add tests

#### PR 3.3.3: updateProfile API Function and Mutation

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/users/api/update-profile.ts`
- [ ] `PATCH /profile` API call
- [ ] `useUpdateProfile` mutation
- [ ] Add tests

#### PR 3.3.4: deleteUser API Function and Mutation

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/users/api/delete-user.ts`
- [ ] `DELETE /users/:id` API call (admin only)
- [ ] `useDeleteUser` mutation
- [ ] Add tests

#### PR 3.3.5: UsersList Component Basic Structure

**Estimated Time**: 2 hours

- [ ] Create `src/features/users/components/users-list.vue`
- [ ] Authorization check (ADMIN role only)
- [ ] Fetch data with `useQuery(getUsersQueryOptions)`
- [ ] Integrate Table component

#### PR 3.3.6: UsersList Column Definition and Display

**Estimated Time**: 1.5 hours

- [ ] Define columns (Name, Email, Role, Team, Actions)
- [ ] Display data
- [ ] Loading state
- [ ] Error state

#### PR 3.3.7: UsersList Delete Button and Tests

**Estimated Time**: 1 hour

- [ ] Add delete button
- [ ] Integration with DeleteUser component
- [ ] Add tests

#### PR 3.3.8: Create UpdateProfile Component

**Estimated Time**: 2 hours

- [ ] Create `src/features/users/components/update-profile.vue`
- [ ] Fetch current user information as initial values
- [ ] Create Zod schema (firstName, lastName, email, bio)
- [ ] Form using Form, Input, Textarea

#### PR 3.3.9: UpdateProfile Mutation Integration

**Estimated Time**: 1.5 hours

- [ ] Integrate `useUpdateProfile` mutation
- [ ] Handle success (notification, update user information)
- [ ] Error handling
- [ ] Add tests

#### PR 3.3.10: Create DeleteUser Component

**Estimated Time**: 1.5 hours

- [ ] Create `src/features/users/components/delete-user.vue`
- [ ] Define Props (userId: string)
- [ ] Authorization check (ADMIN role only)
- [ ] Use ConfirmationDialog component

#### PR 3.3.11: DeleteUser Mutation Integration

**Estimated Time**: 1.5 hours

- [ ] Integrate `useDeleteUser` mutation
- [ ] Handle success (notification, update user list, close Dialog)
- [ ] Error handling

#### PR 3.3.12: DeleteUser Tests

**Estimated Time**: 1 hour

- [ ] Add tests
- [ ] Permission check tests

---

### 3.4 Teams Feature (2 PRs)

#### PR 3.4.1: Teams Type Definitions and API Function

**Estimated Time**: 1 hour

- [ ] Create `src/features/teams/types/index.ts`
- [ ] Create `src/features/teams/api/get-teams.ts`
- [ ] `GET /teams` API call
- [ ] `getTeamsQueryOptions` function

#### PR 3.4.2: Teams Tests

**Estimated Time**: 30 minutes

- [ ] Add tests

---

### 3.5 Auth Feature (6 PRs)

#### PR 3.5.1: Create LoginForm Component

**Estimated Time**: 2 hours

- [ ] Create `src/features/auth/components/login-form.vue`
- [ ] Create Zod schema (email, password)
- [ ] Form using Form, Input
- [ ] Basic styling

#### PR 3.5.2: LoginForm useAuth Integration

**Estimated Time**: 1.5 hours

- [ ] Call `useAuth().login`
- [ ] Handle success (redirect to dashboard)
- [ ] Error handling (display error message)

#### PR 3.5.3: LoginForm Tests

**Estimated Time**: 1 hour

- [ ] Create Vitest unit tests
- [ ] Validation tests
- [ ] Success/failure scenario tests

#### PR 3.5.4: RegisterForm Component Basic Implementation

**Estimated Time**: 2 hours

- [ ] Create `src/features/auth/components/register-form.vue`
- [ ] Create Zod schema (email, password, firstName, lastName, teamId, teamName)
- [ ] Fetch team list with `useQuery(getTeamsQueryOptions)`
- [ ] Form using Form, Input, Select

#### PR 3.5.5: RegisterForm Team Selection UI

**Estimated Time**: 1.5 hours

- [ ] Team selection or creation toggle UI
- [ ] Conditional validation (teamId or teamName)
- [ ] Call `useAuth().register`

#### PR 3.5.6: RegisterForm Tests and Finishing

**Estimated Time**: 1.5 hours

- [ ] Handle success (redirect to dashboard)
- [ ] Error handling
- [ ] Create Vitest unit tests

---

## Phase 4: Routing + Pages (20-25 PRs / 2 weeks)

### 4.1 Route Structure (15 PRs)

#### PR 4.1.1: Landing Page Basic Implementation

**Estimated Time**: 2 hours

- [ ] Create `src/app/routes/landing.vue`
- [ ] Basic layout structure
- [ ] Hero section
- [ ] Integrate Head (SEO) component

#### PR 4.1.2: Landing Page Content

**Estimated Time**: 1.5 hours

- [ ] Feature showcase section
- [ ] Login/registration CTAs
- [ ] Redirect processing if logged in

#### PR 4.1.3: Create NotFound Page

**Estimated Time**: 1 hour

- [ ] Create `src/app/routes/not-found.vue`
- [ ] 404 error message
- [ ] Link to return home
- [ ] Head (SEO) component

#### PR 4.1.4: Create Login Page

**Estimated Time**: 1 hour

- [ ] Create `src/app/routes/auth/login.vue`
- [ ] Use AuthLayout
- [ ] Place LoginForm component
- [ ] Link to registration page
- [ ] Head (SEO) component

#### PR 4.1.5: Create Register Page

**Estimated Time**: 1 hour

- [ ] Create `src/app/routes/auth/register.vue`
- [ ] Use AuthLayout
- [ ] Place RegisterForm component
- [ ] Link to login page
- [ ] Head (SEO) component

#### PR 4.1.6: Create App Root Page (Protected Shell)

**Estimated Time**: 2 hours

- [ ] Create `src/app/routes/app/root.vue`
- [ ] Use DashboardLayout
- [ ] Display nested routes with `<RouterView>`
- [ ] Basic authentication check implementation

#### PR 4.1.7: App Root Page User Information Preload

**Estimated Time**: 1 hour

- [ ] Preload user information (useUser)
- [ ] Loading state
- [ ] Error state (redirect to login page)

#### PR 4.1.8: Create Dashboard Page

**Estimated Time**: 1.5 hours

- [ ] Create `src/app/routes/app/dashboard.vue`
- [ ] Use ContentLayout
- [ ] Welcome message
- [ ] Dashboard statistics (optional)
- [ ] Head (SEO) component

#### PR 4.1.9: Dashboard Page Quick Actions

**Estimated Time**: 1 hour

- [ ] Quick actions (Discussion creation, etc.)
- [ ] Link cards
- [ ] Styling

#### PR 4.1.10: Create Discussions List Page

**Estimated Time**: 1.5 hours

- [ ] Create `src/app/routes/app/discussions/discussions.vue`
- [ ] Use ContentLayout
- [ ] Place DiscussionsList component
- [ ] Pagination support (URL query parameter `?page=1`)

#### PR 4.1.11: Discussions List Page Create Button

**Estimated Time**: 1 hour

- [ ] Place CreateDiscussion component (button + Drawer)
- [ ] Head (SEO) component

#### PR 4.1.12: Create Discussion Detail Page

**Estimated Time**: 2 hours

- [ ] Create `src/app/routes/app/discussions/discussion.vue`
- [ ] Use ContentLayout
- [ ] Place DiscussionView component
- [ ] Place UpdateDiscussion component (edit button + Drawer)
- [ ] Place DeleteDiscussion component (delete button + Dialog)

#### PR 4.1.13: Discussion Detail Page Comments

**Estimated Time**: 1 hour

- [ ] Place Comments component
- [ ] Head (SEO) component (discussion title)

#### PR 4.1.14: Create Profile Page

**Estimated Time**: 1.5 hours

- [ ] Create `src/app/routes/app/profile.vue`
- [ ] Use ContentLayout
- [ ] Place UpdateProfile component
- [ ] Display user information
- [ ] Head (SEO) component

#### PR 4.1.15: Create Users Page

**Estimated Time**: 1.5 hours

- [ ] Create `src/app/routes/app/users.vue`
- [ ] Use ContentLayout
- [ ] Authorization check (ADMIN role only)
- [ ] Place UsersList component
- [ ] Head (SEO) component

---

### 4.2 Route Configuration (8 PRs)

#### PR 4.2.1: Vue Router Basic Route Definition

**Estimated Time**: 1.5 hours

- [ ] Update `src/app/router.ts`
- [ ] Create route definitions (/, /auth/login, /auth/register)
- [ ] App sub-route definitions (/app, /app/dashboard)
- [ ] 404 route

#### PR 4.2.2: Route Lazy Loading Configuration

**Estimated Time**: 1 hour

- [ ] Change all routes to dynamic imports
- [ ] Configure appropriate chunk names
- [ ] Verify build

#### PR 4.2.3: Implement Authentication Route Guard

**Estimated Time**: 2 hours

- [ ] Authentication check in `beforeEach` guard
- [ ] Check if logged in when `meta.requiresAuth` is present
- [ ] Redirect to `/auth/login` if not logged in
- [ ] Add tests

#### PR 4.2.4: Implement Authorization Route Guard

**Estimated Time**: 1.5 hours

- [ ] Authorization check in `beforeEach` guard
- [ ] Check user role when `meta.requiresRole` is present
- [ ] Redirect to `/app/dashboard` + notification if no permission
- [ ] Add tests

#### PR 4.2.5: Logged-in User Redirect Processing

**Estimated Time**: 1 hour

- [ ] Redirect processing for logged-in users accessing auth pages (/auth/*)
- [ ] Redirect to `/app/dashboard`
- [ ] Add tests

#### PR 4.2.6: Implement Data Preload (Discussions)

**Estimated Time**: 1.5 hours

- [ ] Prefetch DiscussionsPage in `beforeResolve` guard
- [ ] Execute query based on page parameter
- [ ] Loading state management

#### PR 4.2.7: Implement Data Preload (Discussion Detail)

**Estimated Time**: 1 hour

- [ ] Prefetch DiscussionPage in `beforeResolve` guard
- [ ] Execute query based on discussionId
- [ ] Error handling (non-existent ID)

#### PR 4.2.8: Configure Scroll Behavior

**Estimated Time**: 30 minutes

- [ ] Configure `scrollBehavior`
- [ ] Scroll to top on page transitions
- [ ] Restore scroll position on history back/forward

---

## Phase 5: Testing Strategy (35-40 PRs / 2-3 weeks)

### 5.1 MSW Setup (12 PRs)

#### PR 5.1.1: Install MSW Dependencies

**Estimated Time**: 30 minutes

- [ ] Install `msw`, `@mswjs/data`, `@mswjs/http-middleware`
- [ ] Install `@ngneat/falso`
- [ ] Generate Service Worker with `npx msw init public/ --save`

#### PR 5.1.2: In-Memory DB Basic Structure

**Estimated Time**: 1.5 hours

- [ ] Create `src/testing/mocks/db.ts`
- [ ] Define user, team, discussion, comment models with `@mswjs/data`
- [ ] Configure relationships (foreign keys)

#### PR 5.1.3: Data Generation Utilities

**Estimated Time**: 1.5 hours

- [ ] Create `src/testing/data-generators.ts`
- [ ] generateUser(), generateTeam(), generateDiscussion(), generateComment() functions
- [ ] Use `@ngneat/falso`

#### PR 5.1.4: DB Initialization Function

**Estimated Time**: 1 hour

- [ ] Create `initializeDb()` function
- [ ] Generate default data
- [ ] Create test users (admin, user)

#### PR 5.1.5: Auth API Handlers

**Estimated Time**: 2 hours

- [ ] Create `src/testing/mocks/handlers/auth.ts`
- [ ] `POST /auth/login` - Login processing
- [ ] `POST /auth/register` - Registration processing
- [ ] `POST /auth/logout` - Logout processing
- [ ] `GET /auth/me` - Get current user

#### PR 5.1.6: Discussions API Handlers

**Estimated Time**: 2 hours

- [ ] Create `src/testing/mocks/handlers/discussions.ts`
- [ ] `GET /discussions` - Get list (pagination support)
- [ ] `GET /discussions/:id` - Get details
- [ ] `POST /discussions` - Create

#### PR 5.1.7: Discussions API Handlers (Update/Delete)

**Estimated Time**: 1.5 hours

- [ ] `PATCH /discussions/:id` - Update
- [ ] `DELETE /discussions/:id` - Delete
- [ ] Permission check

#### PR 5.1.8: Comments API Handlers

**Estimated Time**: 2 hours

- [ ] Create `src/testing/mocks/handlers/comments.ts`
- [ ] `GET /comments?discussionId=:id` - Get list (infinite scroll support)
- [ ] `POST /comments` - Create
- [ ] `DELETE /comments/:id` - Delete (permission check)

#### PR 5.1.9: Users API Handlers

**Estimated Time**: 1.5 hours

- [ ] Create `src/testing/mocks/handlers/users.ts`
- [ ] `GET /users` - Get list (admin only)
- [ ] `PATCH /profile` - Update profile
- [ ] `DELETE /users/:id` - Delete (admin only)

#### PR 5.1.10: Teams API Handlers

**Estimated Time**: 30 minutes

- [ ] Create `src/testing/mocks/handlers/teams.ts`
- [ ] `GET /teams` - Get list

#### PR 5.1.11: MSW Worker Configuration

**Estimated Time**: 1 hour

- [ ] Create `src/testing/mocks/browser.ts` (for browser)
- [ ] Create `src/testing/mocks/server.ts` (for Node.js)
- [ ] Register all handlers

#### PR 5.1.12: Test Setup and MSW Integration

**Estimated Time**: 1.5 hours

- [ ] Update `src/testing/setup-tests.ts`
- [ ] MSW Server start/stop/reset
- [ ] DB initialization
- [ ] Enable mock in development environment in `src/main.ts`

---

### 5.2 Test Utilities (3 PRs)

#### PR 5.2.1: Create Custom Render Function

**Estimated Time**: 2 hours

- [ ] Create `src/testing/test-utils.ts`
- [ ] Implement `renderWithProviders` function
- [ ] Setup Pinia, Vue Router, Vue Query
- [ ] Set initial state (logged-in user, etc.)

#### PR 5.2.2: Create Mock Utilities

**Estimated Time**: 1.5 hours

- [ ] Create `src/testing/mocks/utils.ts`
- [ ] authenticate(user) function
- [ ] unauthenticate() function
- [ ] mockApiSuccess, mockApiError functions

#### PR 5.2.3: Test Helper Functions

**Estimated Time**: 1 hour

- [ ] createWrapper helper
- [ ] waitForQueryToSettle helper
- [ ] Other convenience functions

---

### 5.3 Component Tests (15 PRs)

#### PR 5.3.1: Button Component Test

**Estimated Time**: 1.5 hours

- [ ] Test rendering of each variant
- [ ] Test click events
- [ ] Test loading state
- [ ] Test disabled state

#### PR 5.3.2: Input Component Test

**Estimated Time**: 1.5 hours

- [ ] Test v-model binding
- [ ] Test validation error display
- [ ] Test disabled state

#### PR 5.3.3: Form Component Test

**Estimated Time**: 2 hours

- [ ] Test form submission
- [ ] Test validation
- [ ] Test error handling

#### PR 5.3.4: Table Component Test

**Estimated Time**: 1.5 hours

- [ ] Test data display
- [ ] Test pagination
- [ ] Test empty state

#### PR 5.3.5: Dialog & ConfirmationDialog Test

**Estimated Time**: 2 hours

- [ ] Test open/close behavior
- [ ] Test keyboard operations (Escape)
- [ ] Test confirmation dialog actions

#### PR 5.3.6: Notifications Test

**Estimated Time**: 1.5 hours

- [ ] Test notification display
- [ ] Test auto-removal
- [ ] Test close button

#### PR 5.3.7: LoginForm Test

**Estimated Time**: 2 hours

- [ ] Test form input
- [ ] Test validation errors
- [ ] Test login success
- [ ] Test login failure

#### PR 5.3.8: RegisterForm Test

**Estimated Time**: 2 hours

- [ ] Test form input
- [ ] Test team selection
- [ ] Test registration success
- [ ] Test registration failure

#### PR 5.3.9: DiscussionsList Test

**Estimated Time**: 2 hours

- [ ] Test list display
- [ ] Test pagination
- [ ] Test loading state
- [ ] Test error state

#### PR 5.3.10: CreateDiscussion Test

**Estimated Time**: 1.5 hours

- [ ] Test form input
- [ ] Test creation success
- [ ] Test creation failure

#### PR 5.3.11: UpdateDiscussion & DeleteDiscussion Test

**Estimated Time**: 2 hours

- [ ] Test edit form
- [ ] Test update success
- [ ] Test delete confirmation
- [ ] Test delete success

#### PR 5.3.12: CommentsList Test

**Estimated Time**: 2 hours

- [ ] Test list display
- [ ] Test infinite scroll
- [ ] Test loading state

#### PR 5.3.13: CreateComment & DeleteComment Test

**Estimated Time**: 1.5 hours

- [ ] Test comment creation
- [ ] Test comment deletion (including permission check)

#### PR 5.3.14: useAuth Composable Test

**Estimated Time**: 2 hours

- [ ] Test login
- [ ] Test logout
- [ ] Test get user
- [ ] Test registration

#### PR 5.3.15: useAuthorization Composable Test

**Estimated Time**: 1.5 hours

- [ ] Test role check
- [ ] Test policy check

---

### 5.4 E2E Tests (8 PRs)

#### PR 5.4.1: Authentication Setup

**Estimated Time**: 1 hour

- [ ] Create `e2e/tests/auth.setup.ts`
- [ ] Login with test user
- [ ] Save authentication state (Playwright storage)

#### PR 5.4.2: Smoke Tests

**Estimated Time**: 1.5 hours

- [ ] Create `e2e/tests/smoke.spec.ts`
- [ ] Verify navigation to all major pages
- [ ] Verify pages render correctly

#### PR 5.4.3: Authentication Flow Tests

**Estimated Time**: 2 hours

- [ ] Create `e2e/tests/auth.spec.ts`
- [ ] Test login flow
- [ ] Test registration flow
- [ ] Test logout flow

#### PR 5.4.4: Discussions CRUD Tests

**Estimated Time**: 2.5 hours

- [ ] Create `e2e/tests/discussions.spec.ts`
- [ ] Test discussion list display
- [ ] Test discussion creation flow
- [ ] Test discussion detail page display
- [ ] Test discussion editing flow
- [ ] Test discussion deletion flow
- [ ] Test pagination behavior

#### PR 5.4.5: Comments Tests

**Estimated Time**: 2 hours

- [ ] Create `e2e/tests/comments.spec.ts`
- [ ] Test comments list display
- [ ] Test comment creation flow
- [ ] Test comment deletion flow
- [ ] Test infinite scroll behavior

#### PR 5.4.6: Profile Editing Tests

**Estimated Time**: 1.5 hours

- [ ] Create `e2e/tests/profile.spec.ts`
- [ ] Test profile page access
- [ ] Test profile editing flow
- [ ] Test saved changes verification

#### PR 5.4.7: User Management Tests (Admin)

**Estimated Time**: 2 hours

- [ ] Create `e2e/tests/users.spec.ts`
- [ ] Test admin login
- [ ] Test user list display
- [ ] Test user deletion flow
- [ ] Test access denied verification for non-admin users

#### PR 5.4.8: E2E Test Integration and CI Configuration

**Estimated Time**: 1 hour

- [ ] Verify all E2E tests work
- [ ] CI configuration (GitHub Actions, etc.)
- [ ] Configure test reporting

---

## Phase 6: Developer Experience Improvement (12-15 PRs / 1 week)

### 6.1 ESLint Rules (6 PRs)

#### PR 6.1.1: Install eslint-plugin-import

**Estimated Time**: 30 minutes

- [ ] Install `eslint-plugin-import`
- [ ] Add basic configuration

#### PR 6.1.2: Configure Import Restriction Rules (app layer)

**Estimated Time**: 1 hour

- [ ] Configure `import/no-restricted-paths` rule
- [ ] Allow app → features, components, lib, utils
- [ ] Prohibit app → app

#### PR 6.1.3: Configure Import Restriction Rules (features layer)

**Estimated Time**: 1 hour

- [ ] Prohibit features → other features
- [ ] Prohibit features → app
- [ ] Customize error messages

#### PR 6.1.4: Configure Import Restriction Rules (components/lib layer)

**Estimated Time**: 1 hour

- [ ] Prohibit components → features, app
- [ ] Prohibit lib → features, app
- [ ] Fix existing code

#### PR 6.1.5: Configure Import Order Rules

**Estimated Time**: 1 hour

- [ ] Configure `import/order` rule
- [ ] Group order (builtin, external, internal, parent, sibling, index)
- [ ] Alphabetical sort
- [ ] Auto-fix existing code

#### PR 6.1.6: Configure Additional ESLint Rules

**Estimated Time**: 1.5 hours

- [ ] Tailwind CSS class order (`prettier-plugin-tailwindcss`)
- [ ] a11y rules (`eslint-plugin-vuejs-accessibility`)
- [ ] Configure naming rules
- [ ] Update documentation

---

### 6.2 Code Generator (5 PRs)

#### PR 6.2.1: Plop Configuration

**Estimated Time**: 1 hour

- [ ] Install `plop` (check existing)
- [ ] Create/update `plopfile.cjs`
- [ ] Basic structure for component generation configuration

#### PR 6.2.2: Vue Component Template

**Estimated Time**: 1 hour

- [ ] Create `generators/component/component.vue.hbs`
- [ ] Basic Vue component structure
- [ ] Handlebars variables (name, path, etc.)

#### PR 6.2.3: Test Template

**Estimated Time**: 1 hour

- [ ] Create `generators/component/component.spec.ts.hbs`
- [ ] Vitest template
- [ ] Basic test cases

#### PR 6.2.4: Storybook Template

**Estimated Time**: 1 hour

- [ ] Create `generators/component/component.stories.ts.hbs`
- [ ] Storybook 8 format template
- [ ] Create `generators/component/index.ts.hbs`

#### PR 6.2.5: Generator Tests and Documentation

**Estimated Time**: 1 hour

- [ ] Add script to `package.json`
- [ ] Verify operation
- [ ] Add documentation to README

---

### 6.3 Git Hooks (4 PRs)

#### PR 6.3.1: Husky Setup

**Estimated Time**: 30 minutes

- [ ] Install `husky` (check existing)
- [ ] Initialize with `pnpm exec husky init`

#### PR 6.3.2: lint-staged Configuration

**Estimated Time**: 1 hour

- [ ] Install `lint-staged`
- [ ] Add configuration to `package.json`
- [ ] Create `.husky/pre-commit`
- [ ] Verify operation

#### PR 6.3.3: commitlint Configuration

**Estimated Time**: 1 hour

- [ ] Install `@commitlint/cli`, `@commitlint/config-conventional`
- [ ] Create `commitlint.config.js`
- [ ] Create `.husky/commit-msg`
- [ ] Verify operation

#### PR 6.3.4: Add Test Hook

**Estimated Time**: 30 minutes

- [ ] Create `.husky/pre-push` (optional)
- [ ] Run unit tests
- [ ] Update documentation

---

## Phase 7: Final Adjustments and Documentation (11-13 PRs / 1-2 weeks)

### 7.1 Environment Variables and Deployment Preparation (6 PRs)

#### PR 7.1.1: Environment Variables Documentation

**Estimated Time**: 1 hour

- [ ] Create/update `.env.example`
- [ ] Add environment variable descriptions to README
- [ ] Add deployment instructions

#### PR 7.1.2: Build Configuration Optimization

**Estimated Time**: 1.5 hours

- [ ] Optimize chunk splitting in `vite.config.ts`
- [ ] Check bundle size
- [ ] Remove unnecessary code

#### PR 7.1.3: Performance Verification

**Estimated Time**: 1 hour

- [ ] Check Lighthouse score
- [ ] Performance improvements
- [ ] Update documentation

#### PR 7.1.4: Cloudflare Pages Setup

**Estimated Time**: 1.5 hours

- [ ] Create `wrangler.toml` for Cloudflare Pages configuration
- [ ] Configure build settings (build command, output directory)
- [ ] Set up environment variables in Cloudflare dashboard
- [ ] Configure custom domain (if needed)

#### PR 7.1.5: Cloudflare Pages Build Configuration

**Estimated Time**: 1 hour

- [ ] Add `_headers` file for custom headers
- [ ] Add `_redirects` file for SPA routing (fallback to index.html)
- [ ] Configure caching strategy
- [ ] Test build locally with Wrangler

#### PR 7.1.6: Migrate from Vercel to Cloudflare Pages

**Estimated Time**: 2 hours

- [ ] Remove Vercel configuration (`vercel.json`)
- [ ] Connect GitHub repository to Cloudflare Pages
- [ ] Configure automatic deployments (main/renewal branch)
- [ ] Set up preview deployments for PRs
- [ ] Verify deployment works
- [ ] Update documentation with new deployment URL
- [ ] Archive Vercel project

---

### 7.2 Documentation Creation (3 PRs)

#### PR 7.2.1: Update README

**Estimated Time**: 2 hours

- [ ] Project overview
- [ ] Installation instructions
- [ ] Development server startup method
- [ ] Test execution method
- [ ] Build method
- [ ] Code generator usage

#### PR 7.2.2: Architecture Documentation

**Estimated Time**: 2 hours

- [ ] Create `docs/architecture.md`
- [ ] Feature-Sliced Design explanation
- [ ] Directory structure explanation
- [ ] Dependency rules
- [ ] ESLint rules explanation

#### PR 7.2.3: Contribution Guide

**Estimated Time**: 1.5 hours

- [ ] Create `CONTRIBUTING.md`
- [ ] Branch strategy
- [ ] Commit message conventions
- [ ] PR process
- [ ] Code review criteria

---

### 7.3 Final Testing and Review (3 PRs)

#### PR 7.3.1: Manual Testing of All Features

**Estimated Time**: 3 hours

- [ ] Login/logout test
- [ ] Discussion CRUD test
- [ ] Comment CRUD test
- [ ] Profile editing test
- [ ] User management test (admin)
- [ ] Permission check test
- [ ] Responsive design test
- [ ] Browser compatibility test

#### PR 7.3.2: Performance Tests and Accessibility Check

**Estimated Time**: 2 hours

- [ ] Check Lighthouse score (Performance, Accessibility, Best Practices, SEO)
- [ ] Check bundle size
- [ ] Measure initial load time
- [ ] Test keyboard operations
- [ ] Verify screen reader support
- [ ] Check color contrast

#### PR 7.3.3: Code Cleanup and Final Review

**Estimated Time**: 2 hours

- [ ] Resolve ESLint errors/warnings
- [ ] Resolve TypeScript errors
- [ ] Remove code duplication
- [ ] Remove unused code
- [ ] Organize comments/TODOs
- [ ] Final operation verification

---

## 📊 Statistics

### PR Count Breakdown

| Phase | PR Count | Estimated Effort |
|-------|------|----------|
| Phase 1: Infrastructure | 15 PRs | 1-2 weeks |
| Phase 2: UI Components | 42 PRs | 2-3 weeks |
| Phase 3: Feature Modules | 53 PRs | 4-6 weeks |
| Phase 4: Routing | 23 PRs | 2 weeks |
| Phase 5: Testing | 38 PRs | 2-3 weeks |
| Phase 6: DX Improvement | 15 PRs | 1 week |
| Phase 7: Final Adjustments | 12 PRs | 1-2 weeks |
| **Total** | **198 PRs** | **13-20 weeks** |

### Parallel Work Possibilities

**Phase 2 (UI Components) Parallel Work Example**:

- Form Components (18 PRs): Developer A
- Feedback Components (12 PRs): Developer B
- Layout Components (7 PRs): Developer C

**Phase 3 (Feature Modules) Parallel Work Example**:

- Discussions Feature (18 PRs): Developer A
- Comments Feature (15 PRs): Developer B
- Users Feature (12 PRs): Developer C
- Auth Feature (6 PRs): Developer D

### Effort Reduction Possibilities

**1 person**: 13-20 weeks
**2 people**: 7-12 weeks (40% reduction through parallel work)
**3 people**: 5-9 weeks (55% reduction through parallel work)
**4 people**: 4-7 weeks (65% reduction through parallel work)

---

## 🎯 Recommended Implementation Order (with PR numbers)

### Week 1: Infrastructure Construction

- PR 1.1.1 → 1.1.6 (API Client Layer)
- PR 1.2.1 → 1.2.6 (Authentication System)
- PR 1.3.1 → 1.3.3 (Environment Configuration)

### Week 2-3: Basic UI Components

- PR 2.1.1 → 2.1.18 (Form Components)

### Week 4: Feedback Components

- PR 2.2.1 → 2.2.12 (Notifications, Dialog, Dropdown)

### Week 5: Layout & Other UI

- PR 2.3.1 → 2.3.7 (Layout Components)
- PR 2.4.1 → 2.4.6 (Other UI Components)

### Week 6-8: Discussions Feature (Most Important)

- PR 3.1.1 → 3.1.18 (Discussions Feature)

### Week 9-10: Comments & Users Features

- PR 3.2.1 → 3.2.15 (Comments Feature)
- PR 3.3.1 → 3.3.12 (Users Feature)

### Week 11: Teams & Auth Features

- PR 3.4.1 → 3.4.2 (Teams Feature)
- PR 3.5.1 → 3.5.6 (Auth Feature)

### Week 12-13: Routing

- PR 4.1.1 → 4.1.15 (Route Structure)
- PR 4.2.1 → 4.2.8 (Route Configuration)

### Week 14-16: Test Implementation

- PR 5.1.1 → 5.1.12 (MSW Setup)
- PR 5.2.1 → 5.2.3 (Test Utilities)
- PR 5.3.1 → 5.3.15 (Component Tests)
- PR 5.4.1 → 5.4.8 (E2E Tests)

### Week 17: Developer Experience Improvement

- PR 6.1.1 → 6.1.6 (ESLint Rules)
- PR 6.2.1 → 6.2.5 (Code Generator)
- PR 6.3.1 → 6.3.4 (Git Hooks)

### Week 18-19: Final Adjustments

- PR 7.1.1 → 7.1.6 (Deployment Preparation + Cloudflare Migration)
- PR 7.2.1 → 7.2.3 (Documentation)
- PR 7.3.1 → 7.3.3 (Final Testing)

---

## ✅ Checklist for Each PR

Before merging each PR, verify the following:

- [ ] Code builds (`pnpm build`)
- [ ] No type errors (`pnpm type-check`)
- [ ] No lint errors (`pnpm lint`)
- [ ] Related tests added
- [ ] All tests pass (`pnpm test`)
- [ ] Storybook stories added (for UI components)
- [ ] Commit messages follow conventions
- [ ] PR title and description are clear
- [ ] Review received

---

## 🚀 Next Steps

1. **Team review of this document**
2. **Assign team members** (for parallel work)
3. **Sprint planning** (2-week sprints recommended)
4. **Start with PR 1.1.1 from Phase 1** 🎉
