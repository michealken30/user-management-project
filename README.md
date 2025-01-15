# User Management System with Role-Based Access Control (RBAC)

A full-stack application designed for user management, leveraging Role-Based Access Control (RBAC) to ensure secure access and management of users, roles, permissions, and groups. This system uses JWT for authentication, bcrypt for password hashing, and Sequelize ORM for database management with PostgreSQL.

## Table of Contents

- [Database Design](#database-design)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Running with Docker](#running-with-docker)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Role Management](#role-management)
  - [Permission Management](#permission-management)
  - [Group Management](#group-management)
  - [Profile Management](#profile-management)
- [Development Setup](#development-setup)
- [Security Features](#security-features)

## Database Design

![Untitled Diagram drawio](https://github.com/user-attachments/assets/491a1277-7e73-4e85-a338-0ef57fefe64e)


### Entity Relationship Diagram

```
User
├── id (UUID, PK)
├── username (String, Unique)
├── email (String, Unique)
└── password (String, Hashed)

Database Structure and Relationships:

    User:
        id (UUID, Primary Key)
        username (String)
        email (String, unique)
        password (String)

    Relationships:
        One-to-One with Profile (userId in Profile references id in User).
        Many-to-Many with Role (a user can have many roles, and a role can belong to many users). This would require a junction table UserRoles.

    Role:
        id (UUID, Primary Key)
        name (String, unique)
        description (String)

    Relationships:
        Many-to-Many with User (through UserRoles).

    Group:
        id (UUID, Primary Key)
        name (String, unique)
        description (String)

    Relationships:
        Many-to-Many with Permission (a group can have many permissions, and a permission can belong to many groups). This would require a junction table GroupPermissions.

    Permission:
        id (UUID, Primary Key)
        name (String, unique)
        description (String)

    Relationships:
        Many-to-Many with Group (through GroupPermissions).

    Profile:
        id (UUID, Primary Key)
        userId (UUID, Foreign Key to User)
        fullName (String)
        avatarUrl (String)
        updatedAt (Date)

    Relationships:
        One-to-One with User.

```

![alt text](<db-design Diagram.drawio.png>)

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Role-Based Access Control (RBAC)**: Users can have multiple roles, and each role can have specific permissions.
- **Password Hashing**: Secure password storage using bcrypt.
- **Input Validation**: Validate user inputs during registration and authentication.
- **Error Handling**: Graceful error handling for failed operations.
- **PostgreSQL Database**: Manage users, roles, permissions, and groups with Sequelize ORM.

## Prerequisites

- **Node.js** (Ensure Node.js is installed on your machine)
- **PostgreSQL** (Database for storing user information, roles, etc.)



## API Endpoint

Role Management

    GET /api/roles
    POST /api/roles
    PUT /api/roles/:id
    DELETE /api/roles/:id

Permission Management

    GET /api/permissions
    POST /api/permissions

Group Management

    GET /api/groups
    POST /api/groups

User Management

    GET /api/users
    GET /api/users/:id
    DELETE /api/users/:id

Authentication

    POST /api/auth/register
    POST /api/auth/login

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/michealken30/user-management-project.git
   ```

### Environment Variables

To run the application locally, you'll need to add the following environment variables to your `.env` file:

```env
DB_NAME=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Installation and Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run database migrations to set up the database schema:

   ```bash
   npm run migrate
   ```

3. Seed the database with initial data:

   ```bash
   npm run seed:all
   ```

4. Start the development server:

   ```bash
   npm run dev:server
   ```

5. Start the client development server (if applicable):
   ```bash
   npm run dev:client
   ```

## Security Features

- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Password Hashing**: User passwords are hashed with bcrypt for secure storage.
- **Input Validation**: All incoming requests are validated for required fields and correct formats.
- **Error Handling**: Proper error handling is implemented to provide meaningful messages.
- **CORS**: Cross-Origin Resource Sharing is enabled to handle requests from different origins.

---

