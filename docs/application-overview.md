# 💻 Application Overview

The application is pretty simple. Users can create teams where other users can join, and they start discussions on different topics between each other.

A team is created during the registration if the user didn't choose to join an existing team and the user becomes the admin of it.

[Demo](https://bulletproof-vue.vercel.app)

## Data model

The application contains the following models:

- User - can have one of these roles:

  - `ADMIN` can:
    - create/edit/delete discussions
    - create/delete all comments
    - delete users
    - edit own profile
  - `USER` - can:
    - edit own profile
    - create/delete own comments

- Team: represents a team that has 1 admin and many users that can participate in discussions between each other.

- Discussion: represents discussions created by team members.

- Comment: represents all the messages in a discussion.

## Get Started

Prerequisites:

- Node 18+

To set up the app execute the following commands.

```bash
git clone https://github.com/hirotaka/bulletproof-vue.git
cd bulletproof-vue
cp .env .env.local
npm install
```

##### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.
