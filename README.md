# Product Management API

A robust RESTful API built with **Node.js**, **Express**, and **TypeScript** following **Clean Architecture** and **Domain-Driven Design** principles. This project demonstrates modern backend development practices including authentication, authorization, comprehensive testing, and MongoDB integration.

## 🎯 Project Overview

This API manages products and users with a complete authentication system. It showcases professional backend development with:

- **Clean Architecture** with clear separation of concerns (Domain, Infrastructure, UI layers)
- **Domain-Driven Design** with entities, repositories, and use cases
- **JWT-based Authentication** with bcrypt password hashing
- **Authorization** with ownership validation for CRUD operations
- **Comprehensive E2E Testing** with Jest and MongoDB Memory Server
- **Request Validation** using Zod schemas
- **Error Handling** with custom domain errors
- **Factory Pattern** for dependency injection

## 🏗️ Architecture

The project follows a **layered architecture**:

```
src/
├── domain/           # Business logic layer
│   ├── entities/     # Domain entities (User, Product)
│   ├── repositories/ # Repository interfaces
│   ├── services/     # Domain services
│   ├── types/        # DTOs and custom errors
│   └── use-cases/    # Application use cases
├── infrastructure/   # External dependencies layer
│   ├── models/       # MongoDB schemas
│   ├── repositories/ # Repository implementations
│   └── services/     # Infrastructure services (bcrypt, environment)
├── ui/              # Presentation layer
│   ├── controllers/ # Request handlers
│   ├── routes/      # API routes
│   ├── validators/  # Request validation schemas
│   ├── middlewares/ # Authentication & error handling
│   └── factories/   # Dependency injection factories
└── tests/           # E2E tests
```

### Key Architectural Patterns

- **Repository Pattern**: Abstracts data access logic
- **Use Case Pattern**: Encapsulates business logic
- **Factory Pattern**: Manages dependency creation
- **Middleware Pattern**: Handles cross-cutting concerns (auth, errors)

## 🚀 Tech Stack

- **Runtime**: Node.js 22
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod
- **Testing**: Jest + Supertest + MongoDB Memory Server
- **Code Quality**: ESLint + Prettier

## 📋 Features

### Authentication & Authorization

- User registration with password hashing
- User login with JWT token generation
- Protected routes with JWT middleware
- Ownership-based authorization for resource operations

### Product Management

- Create products (authenticated users only)
- List all products (public)
- Get product by ID (public)
- Update products (owner only)
- Delete products (owner only)

### Security

- Password hashing with bcrypt
- JWT token-based authentication
- Environment-based configuration
- Custom domain errors for business logic validation

## 🔧 Installation & Setup

### Prerequisites

- Node.js 22 (specified in `.nvmrc`)
- MongoDB instance (local or cloud)

### Environment Variables

Create `.env` files for different environments:

**.env.local**

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/product-api-local
JWT_SECRET=your-local-secret-key
```

**.env.staging**

```env
PORT=3000
MONGO_URI=your-staging-mongodb-uri
JWT_SECRET=your-staging-secret-key
```

**.env.production**

```env
PORT=3000
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret-key
```

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Use correct Node version
nvm use
```

## 🎮 Usage

### Development

```bash
# Start development server (local environment)
npm run start

# Start with staging environment
npm run start:staging

# Start with production environment
npm run start:prod
```

### Testing

```bash
# Run E2E tests
npm run test:e2e
```

### Code Quality

```bash
# Run linter
npm run lint

# Format code
npm run format

# Build TypeScript
npm run build
```

## 📡 API Endpoints

### Authentication

#### Sign Up

```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

#### Sign In

```http
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response:**

```json
{
  "content": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Products

#### Create Product (Protected)

```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description"
}
```

#### List Products

```http
GET /products
```

#### Get Product by ID

```http
GET /products/:productId
```

#### Update Product (Owner Only)

```http
PATCH /products/:productId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

#### Delete Product (Owner Only)

```http
DELETE /products/:productId
Authorization: Bearer <token>
```

## 🧪 Testing Strategy

The project includes comprehensive E2E tests covering:

- **Authentication**: Signup, signin, and token validation
- **Product Creation**: With and without authentication
- **Product Reading**: Finding by ID and listing all products
- **Product Updates**: Authorization and ownership validation
- **Product Deletion**: Authorization and ownership validation
- **Error Scenarios**: Invalid tokens, unauthorized access, not found resources

Tests use **MongoDB Memory Server** for isolated, fast testing without external dependencies.

## 🔐 Security Features

1. **Password Security**: Passwords are hashed using bcrypt before storage
2. **JWT Authentication**: Stateless authentication with signed tokens
3. **Authorization**: Ownership validation prevents unauthorized resource modifications
4. **Environment Configuration**: Sensitive data managed through environment variables
5. **Input Validation**: All requests validated with Zod schemas
6. **Custom Error Handling**: Domain errors prevent information leakage

## 📦 Domain Errors

Custom error hierarchy for better error handling:

- `DomainError` - Base abstract error
- `UnauthorizedError` - Authentication failures
- `ForbiddenOperation` - Authorization failures
- `EntityNotFoundError` - Resource not found
- `BusinessConflictError` - Business rule violations

## 🎯 Why This Architecture?

This project demonstrates production-ready backend development:

1. **Testability**: Clean separation allows easy unit and integration testing
2. **Maintainability**: Clear boundaries between layers reduce coupling
3. **Scalability**: Repository pattern allows easy database switching
4. **Flexibility**: Use cases can be reused across different delivery mechanisms
5. **Domain Focus**: Business logic isolated from infrastructure concerns

## 🙏 Acknowledgments

This project was built as a learning exercise to demonstrate Clean Architecture and modern backend development practices with Node.js and TypeScript.

- Implementing pagination
- Enhancing logging and monitoring
- Adding more comprehensive tests
- And more...
