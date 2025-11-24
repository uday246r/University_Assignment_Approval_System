# Quick Setup Guide

## Step 1: Create .env file

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DATABASE_URL="postgresql://user:password@localhost:5432/university_approval_db?schema=public"
```

**For SQLite (easier for development):**
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DATABASE_URL="file:./dev.db"
```

## Step 2: Generate Prisma Client

```bash
npm run prisma:generate
```

## Step 3: Run Database Migrations

```bash
npm run prisma:migrate
```

When prompted, enter a migration name (e.g., "init")

## Step 4: Start the Server

```bash
npm run dev
```

## Step 5: Create Your First Admin User

Use Postman, Thunder Client, or curl to register an admin:

```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "admin@university.edu",
  "password": "admin123",
  "name": "Admin User",
  "role": "ADMIN"
}
```

## Step 6: Login and Get Token

```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@university.edu",
  "password": "admin123"
}
```

Copy the token from the response.

## Step 7: Create a Department

```bash
POST http://localhost:3000/api/departments
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "name": "Computer Science",
  "code": "CS",
  "description": "Department of Computer Science"
}
```

## Step 8: Create Users

```bash
POST http://localhost:3000/api/users
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "email": "professor@university.edu",
  "password": "prof123",
  "name": "Professor Name",
  "role": "PROFESSOR",
  "departmentId": "<department-id-from-step-7>"
}
```

## Testing the API

You can test all endpoints using:
- Postman
- Thunder Client (VS Code extension)
- curl
- Any REST client

## View Database

To view your database in a GUI:

```bash
npm run prisma:studio
```

This will open Prisma Studio at `http://localhost:5555`

## Next Steps

1. ✅ User Story 1: Admin Registration and Login - DONE
2. ✅ User Story 2: Admin Dashboard View - Use GET endpoints
3. ✅ User Story 3: Create Department - DONE
4. ✅ User Story 4: View All Departments - DONE
5. ✅ User Story 5: Edit Department Details - DONE
6. ✅ User Story 6: Delete Department - DONE
7. ✅ User Story 7: Create User Accounts - DONE
8. ✅ User Story 8: View All Users - DONE
9. ✅ User Story 9: Edit User Account - DONE
10. ✅ User Story 10: Delete User Account - DONE

All user stories 1-10 are now implemented! 🎉


