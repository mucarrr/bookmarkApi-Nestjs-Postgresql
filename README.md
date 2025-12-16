# 📌 Bookmark Management API with NestJS and Prisma ORM! 

# What I Built:
- A complete CRUD (Create, Read, Update, Delete) API for bookmarks
  
- User authentication with JWT (access and refresh tokens)

- Pagination for listing bookmarks
  
- User-specific bookmark management

# NestJS Features I Used:
- Modules - Organized code into separate modules (Auth, Bookmark, Prisma)
  
- Guards - Protected routes with JWT authentication guards
  
- Custom Decorators - Created a @UserDecorator to easily access user data
  
- Pipes - Used ValidationPipe for request validation
  
- DTOs - Data Transfer Objects for type-safe request handling
  
- Dependency Injection - Clean service architecture
  
- Exception Handling - Proper error responses

# Why Prisma ORM?
I chose Prisma because it makes database work much easier:

✅ Type Safety - Prisma generates TypeScript types from your database schema. This means fewer bugs and better code completion in your IDE.

✅ No Raw SQL - You write queries using a clean JavaScript API instead of SQL strings. For example, instead of writing complex SQL joins, you can use simple `include` statements.

✅ Schema as Code - Your database schema is defined in a Prisma schema file. This makes it easy to version control and share with your team.

✅ Migrations - Prisma handles database migrations automatically. When you change your schema, Prisma creates migration files for you.

# Tech Stack:
- NestJS (Node.js framework)
  
- Prisma ORM
  
- PostgreSQL (database)
  
- JWT (authentication)
  
- TypeScript
