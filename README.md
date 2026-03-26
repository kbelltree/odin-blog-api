# The Odin Project: Blog API

This is an **API-only** backend project for a blog site, built with a **RESTful** structure. The project focuses on separating backend and frontend code into different codebases and practicing communication between a backend API and a frontend application.

The frontend for this project is built in a separate repository ([frontend repo](https://github.com/kbelltree/odin-blog-api-frontend)).

For the full assignment details, see: [The Odin Project - Blog API](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api).

## Key Project Instructions

**Data management:** <br>

- Use **Prisma ORM** to manage users, posts, and comments

**Web application framework:** <br>

- Build the API using **Express**

**Authentication:** <br>

- Implement **JWT-based authentication**
- Use **Passport JWT strategy** to protected routes
- Handle authentication through the `Authorization` header using the Bearer scheme

**Main Features:** <br>

1. **Models and schema**<br>
   - **User**: email, username, password
   - **Post**: title, content, author, published timestamp, created timestamp, comments
   - **Comment**: comment content, created timestamp

2. **Routes** <br>
   - Auth
   - Posts
   - Me

3. **Auth flow** <br>
   - Sign up: hash password before saving
   - Log in: verify password and issue JWT
   - Protected routes: require a valid token

4. **Frontend flow** <br>
   - A separate frontend fetches and displays data from this API

## Live Links

- Frontend: https://odin-blog-api-frontend.onrender.com
- API: https://odin-blog-api-txij.onrender.com
- Health check: https://odin-blog-api-txij.onrender.com/health

## Built With

- Prisma ORM
- PostgreSQL
- Express
- Passport.js
- jsonwebtoken
- bycriptjs
- cors
- Neon
- Render

## ToDo

- npm audit shows remaining transitive vulnerabilities through Prisma 7 dependencies
- do not run npm audit fix --force because it downgrades Prisma to 6.x
- recheck audit when updating Prisma / Express later
