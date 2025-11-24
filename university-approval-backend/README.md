# University Assignment Approval System - Backend

A comprehensive backend API for managing university assignment submissions, reviews, and approvals with multi-level workflow support.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Department Management**: CRUD operations for departments
- **User Management**: Create, read, update, and delete users with different roles
- **Role-Based Access Control**: ADMIN, HOD, PROFESSOR, and STUDENT roles
- **Assignment Workflow**: Multi-level approval system (to be implemented)

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (or SQLite for development)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (Change this to a random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/university_approval_db?schema=public"
```

### 3. Database Setup

#### For PostgreSQL:
1. Create a PostgreSQL database
2. Update `DATABASE_URL` in `.env` with your database credentials

#### For SQLite (Development):
```env
DATABASE_URL="file:./dev.db"
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run Database Migrations

```bash
npm run prisma:migrate
```

This will create the database tables based on the Prisma schema.

### 6. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the PORT specified in your `.env` file).

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Body: {
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "role": "ADMIN",
  "departmentId": "optional-department-id"
}
```

#### Login
```
POST /api/auth/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}
```

### Departments (Requires Authentication)

#### Create Department (Admin Only)
```
POST /api/departments
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "name": "Computer Science",
  "code": "CS",
  "description": "Department of Computer Science"
}
```

#### Get All Departments
```
GET /api/departments
Headers: {
  "Authorization": "Bearer <token>"
}
```

#### Get Department by ID
```
GET /api/departments/:id
Headers: {
  "Authorization": "Bearer <token>"
}
```

#### Update Department (Admin Only)
```
PUT /api/departments/:id
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "name": "Updated Name",
  "code": "UPD",
  "description": "Updated description"
}
```

#### Delete Department (Admin Only)
```
DELETE /api/departments/:id
Headers: {
  "Authorization": "Bearer <token>"
}
```

### Users (Requires Authentication)

#### Create User (Admin Only)
```
POST /api/users
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "role": "STUDENT",
  "departmentId": "department-id"
}
```

#### Get All Users (Admin Only)
```
GET /api/users
Headers: {
  "Authorization": "Bearer <token>"
}
```

#### Get User by ID
```
GET /api/users/:id
Headers: {
  "Authorization": "Bearer <token>"
}
```

#### Update User (Admin Only)
```
PUT /api/users/:id
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "email": "updated@example.com",
  "name": "Updated Name",
  "role": "PROFESSOR",
  "departmentId": "department-id"
}
```

#### Delete User (Admin Only)
```
DELETE /api/users/:id
Headers: {
  "Authorization": "Bearer <token>"
}
```

## User Roles

- **ADMIN**: Full access to manage departments, users, and system settings
- **HOD**: Head of Department - can approve assignments at the department level
- **PROFESSOR**: Can review and approve/reject assignments
- **STUDENT**: Can create and submit assignments

## Database Schema

### Models

- **User**: Stores user information with authentication and role
- **Department**: Stores department information
- **Assignment**: Stores assignment submissions and their status (to be implemented)

### Enums

- **Role**: STUDENT, PROFESSOR, HOD, ADMIN
- **AssignmentStatus**: DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED_BY_PROFESSOR, APPROVED_BY_HOD, REJECTED, RESUBMIT

## Project Structure

```
university-approval-backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── authController.ts
│   │   ├── departmentController.ts
│   │   └── userController.ts
│   ├── middlewares/           # Express middlewares
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── routes/                # API routes
│   │   ├── authRoutes.ts
│   │   ├── departmentRoutes.ts
│   │   └── userRoutes.ts
│   ├── utils/                 # Utility functions
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── prisma.ts
│   └── index.ts               # Application entry point
├── .env                       # Environment variables
├── package.json
└── tsconfig.json
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Next Steps

1. **Create First Admin User**: Use the register endpoint to create an admin user
2. **Create Departments**: Use the department endpoints to create departments
3. **Create Users**: Create users for different roles (STUDENT, PROFESSOR, HOD)
4. **Implement Assignment APIs**: Add assignment submission and approval workflows

## Development Workflow

1. Make changes to the code
2. The development server will automatically reload
3. Test your changes using the API endpoints
4. Use Prisma Studio to view and manage database data: `npm run prisma:studio`

## Security Notes

- Change `JWT_SECRET` in production to a strong, random string
- Use environment variables for all sensitive configuration
- Implement rate limiting for production
- Use HTTPS in production
- Validate and sanitize all user inputs

## License

ISC


