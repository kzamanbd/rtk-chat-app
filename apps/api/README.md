# RTK Chat App - Backend API

Express.js backend API for the RTK Chat App with TypeScript, Socket.io, MongoDB, and JWT authentication.

## 🚀 Features

- **RESTful API** - Clean REST endpoints for all operations
- **Real-time Communication** - Socket.io for instant messaging and notifications
- **User Authentication** - JWT-based authentication with secure cookies
- **MongoDB Integration** - Persistent data storage with Mongoose ODM
- **Email Notifications** - Nodemailer integration for user registration
- **API Documentation** - Swagger/OpenAPI documentation
- **Error Handling** - Comprehensive error handling and logging
- **Docker Support** - Containerized deployment with Docker Compose

## 🛠️ Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type safety and modern JavaScript features
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Winston** - Logging library
- **Nodemailer** - Email service
- **Swagger** - API documentation

## 📦 Installation

### Prerequisites

- Node.js >= 18
- MongoDB (local or cloud)
- pnpm >= 9.0.0

### Setup

1. **Install dependencies** (from project root):

   ```bash
   pnpm install
   ```

2. **Environment Configuration**:

   ```bash
   cp .env.example .env
   ```

   Configure the following environment variables:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/rtk-chat-app
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRY=1d
   COOKIE_NAME=token
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Email Configuration (Mailtrap for development)
   MAIL_HOST=sandbox.smtp.mailtrap.io
   MAIL_PORT=2525
   MAIL_USER=your-mailtrap-user
   MAIL_PASS=your-mailtrap-password
   
   # CORS Configuration
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start development server**:

   ```bash
   # From project root
   pnpm --filter @rtk-app/api dev
   
   # Or from this directory
   cd apps/api
   pnpm dev
   ```

The API will be available at [http://localhost:5000](http://localhost:5000).

## 🐳 Docker Setup

### Using Docker Compose

```bash
cd apps/api
docker-compose up -d --build
```

This will start:

- MongoDB database (port 27017)
- Express API server (port 5000)
- Nginx reverse proxy (port 80)

### Environment Variables for Docker

Create a `.env` file in the `apps/api` directory:

```env
MONGODB_URI=mongodb://mongo:27017/rtk-chat-app
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRY=1d
COOKIE_NAME=token
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost:5173
```

## 📜 Available Scripts

```bash
pnpm dev              # Start development server with hot reload
pnpm build            # Build TypeScript to JavaScript
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors
pnpm check-types      # Type check without emitting files
```

## 🏗️ Project Structure

```md
apps/api/
├── src/
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.ts    # Authentication routes
│   │   ├── base.controller.ts    # Base/user routes
│   │   ├── chat.controller.ts    # Chat/message routes
│   │   └── socket.controller.ts  # Socket.io handlers
│   ├── middleware/           # Express middleware
│   │   ├── authenticate.ts       # JWT authentication
│   │   └── errorHandler.ts       # Error handling
│   ├── models/              # Mongoose models
│   │   ├── user.ts              # User model
│   │   ├── conversation.ts      # Conversation model
│   │   └── message.ts           # Message model
│   ├── services/            # Business logic
│   │   └── chat.service.ts      # Chat service
│   ├── utils/               # Utility functions
│   │   ├── logger.ts            # Winston logger
│   │   └── AppError.ts          # Custom error class
│   ├── routes.ts            # Main router
│   ├── index.ts             # Express server setup
│   └── swagger.json         # API documentation
├── build/                   # Compiled JavaScript
├── docker-compose.yml       # Docker services
├── Dockerfile              # Docker configuration
└── nginx.conf              # Nginx configuration
```

## 🔌 API Endpoints

### Base Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check and API info |

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/login` | User login | No |
| POST | `/register` | User registration | No |

### Base Routes (`/api`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/refresh-token` | Get current user info | Yes |
| GET | `/logout` | User logout | Yes |

### Chat Routes (`/api/chat`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users for chat | Yes |
| GET | `/conversation/:userId` | Find conversation with user | Yes |
| POST | `/conversation` | Create new conversation | Yes |
| GET | `/conversations/:userId` | Get user conversations | Yes |
| GET | `/messages/:conversationId` | Get conversation messages | Yes |
| POST | `/message` | Send message | Yes |
| POST | `/call-request` | Initiate video call | Yes |

## 📝 API Documentation

### Authentication

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com", // or username
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful!",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "username": "johndoe",
    "email": "user@example.com",
    "avatar": null
  },
  "token": "jwt_token_here"
}
```

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "withLogin": true // Optional: auto-login after registration
}
```

### Chat Operations

#### Get Users

```http
GET /api/chat/users
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "users": [
    {
      "_id": "user_id",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "conversationId": "conversation_id_or_null"
    }
  ]
}
```

#### Create Conversation

```http
POST /api/chat/conversation
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "target_user_id",
  "message": "Hello!"
}
```

#### Send Message

```http
POST /api/chat/message
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Hello, how are you?",
  "conversationId": "conversation_id"
}
```

#### Get Messages

```http
GET /api/chat/messages/:conversationId
Authorization: Bearer <token>
```

## 🔌 Socket.io Events

### Client → Server

| Event | Description | Data |
|-------|-------------|------|
| `join` | Join a conversation room | `{ conversationId }` |
| `leave` | Leave a conversation room | `{ conversationId }` |
| `typing` | User is typing | `{ conversationId, userId }` |
| `stopTyping` | User stopped typing | `{ conversationId, userId }` |

### Server → Client

| Event | Description | Data |
|-------|-------------|------|
| `newMessage` | New message received | `{ message, userInfo }` |
| `conversation` | New conversation created | `{ conversation, partnerInfo }` |
| `newCallRequest` | Incoming video call | `{ room_id, caller, target_user_id }` |
| `userTyping` | User is typing | `{ conversationId, userId }` |
| `userStopTyping` | User stopped typing | `{ conversationId, userId }` |

## 🗄️ Database Models

### User Model

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  username: string,
  password: string,
  avatar: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Conversation Model

```typescript
{
  _id: ObjectId,
  toUser: ObjectId, // Reference to User
  fromUser: ObjectId, // Reference to User
  lastMessage: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model

```typescript
{
  _id: ObjectId,
  userInfo: ObjectId, // Reference to User
  conversationId: ObjectId, // Reference to Conversation
  message: string,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for password security
- **CORS Protection** - Configurable cross-origin resource sharing
- **Cookie Security** - HttpOnly, Secure, SameSite cookies
- **Input Validation** - Request validation and sanitization
- **Error Handling** - Secure error messages without sensitive data

## 📊 Logging

The API uses Winston for comprehensive logging:

- **Console Logging** - Development environment
- **File Logging** - Production environment
- **MongoDB Logging** - Error logs stored in database
- **Request Logging** - All HTTP requests logged

## 🚀 Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-production-db-url
JWT_SECRET=your-production-secret
FRONTEND_URL=https://your-frontend-url.com
```

### Deployed URLs

- **API Documentation**: <https://rtk-chat-app.onrender.com/api-docs>
- **Health Check**: <https://rtk-chat-app.onrender.com/>

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Write meaningful commit messages
4. Update API documentation
5. Test all endpoints thoroughly

## 📝 License

This project is licensed under the ISC License.
