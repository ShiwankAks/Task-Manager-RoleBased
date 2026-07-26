# 🚀 Task Manager – Role Based Access Control (RBAC)

> A production-oriented full-stack task management application built with the MERN ecosystem, featuring JWT authentication, Role-Based Access Control (RBAC), secure REST APIs, Redis integration, and a modern React frontend.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-6-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Express-5-black?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb" />
  <img src="https://img.shields.io/badge/Redis-Rate%20Limiting-red?logo=redis" />
  <img src="https://img.shields.io/badge/JWT-Authentication-orange" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

---

## 📖 Overview

This project is a secure task management platform where users are assigned different roles with different permissions.

The backend follows a production-oriented architecture using Express, TypeScript, MongoDB, JWT Authentication, Role-Based Authorization, and Redis. The frontend is built with React, TypeScript, Vite, Tailwind CSS, and Axios.

The application demonstrates real-world backend concepts such as:

- Authentication
- Authorization
- Protected APIs
- Middleware Architecture
- Secure Password Storage
- REST API Design
- Role-Based Access Control
- Redis Rate Limiting

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Token Verification Middleware

---

## 👥 Role Based Access Control (RBAC)

Three user roles are supported:

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access |
| **Manager** | Manage tasks and employees |
| **Employee** | View and update assigned tasks |

---

## ✅ Task Management

- Create Task
- Delete Task
- Assign Tasks
- Change Task Priority
- Update Task Status
- View Assigned Tasks
- View All Tasks

---

## 👨‍💼 User Management

Admins can:

- Delete Users
- Change User Roles

Managers can:

- View Employees

Employees can:

- View their assigned tasks

---

## 🛡 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Role Based Authorization
- Helmet Security Headers
- CORS Protection
- Input Validation
- Redis Rate Limiting
- Protected REST Endpoints

---

# 🏗 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

---

## Backend

- Node.js
- Express 5
- TypeScript
- MongoDB
- Mongoose
- Redis
- JWT
- bcrypt
- Helmet

---

# 📂 Project Structure

```
Task-Manager/
│
├── frontend/
│   ├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── App.tsx
│
├── backend/
│   ├── src/
│   │
│   ├── config/
│   │     ├── mongodb.ts
│   │     └── redis.ts
│   │
│   ├── controllers/
│   │
│   ├── middlewares/
│   │     ├── authMiddleware.ts
│   │     ├── roleMiddleware.ts
│   │     └── rateLimiter.ts
│   │
│   ├── models/
│   ├── routes/
│   ├── types/
│   └── index.ts
│
└── README.md
```

---

# 🏛 Backend Architecture

```
                Client
                   │
                   ▼
              Express Server
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
 Authentication         Rate Limiter
        │                     │
        ▼                     ▼
 Authorization        Redis (Cache)
        │
        ▼
 Controllers
        │
        ▼
 MongoDB Database
```

---

# 🔐 Authorization Flow

```
Login
   │
   ▼
Generate JWT
   │
   ▼
Client Stores Token
   │
   ▼
Protected Request
   │
   ▼
Verify JWT
   │
   ▼
Check User Role
   │
   ▼
Authorized?
 │        │
Yes      No
 │        │
 ▼        ▼
Controller 403
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

---

## User

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | `/api/user/all-users` | Admin, Manager |
| DELETE | `/api/user/delete-user/:id` | Admin |
| PATCH | `/api/user/change-role/:id` | Admin |

---

## Tasks

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | `/api/user/add-task` | Admin |
| GET | `/api/user/all-task` | Admin, Manager |
| GET | `/api/user/my-task` | Employee |
| PATCH | `/api/user/change-priority/:id` | Admin, Manager |
| PATCH | `/api/user/change-status/:taskId` | Employee |
| DELETE | `/api/user/delete/:id` | Admin |

---

# 🔑 Environment Variables

## Backend

Create `.env`

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret

CLIENT_URL=http://localhost:5173

REDIS_URL=your_redis_url
```

---

## Frontend

```env
VITE_API_URL=http://localhost:5000
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/ShiwankAks/Task-Manager-RoleBased.git
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔒 Middleware Used

- Authentication Middleware
- Role Authorization Middleware
- Redis Rate Limiter
- Helmet
- CORS
- JSON Parser

---

# 🚀 Future Improvements

- Refresh Token Authentication
- Email Verification
- Password Reset
- Swagger / OpenAPI Documentation
- Docker Support
- Unit & Integration Testing
- Activity Logs
- Audit Trail
- WebSocket Notifications
- File Uploads
- Search & Filtering
- Pagination
- Soft Delete
- Zod Validation
- Redis Caching
- CI/CD Pipeline

---

# 💡 Key Learning Outcomes

This project demonstrates practical implementation of:

- RESTful API Design
- Authentication & Authorization
- JWT Security
- Role Based Access Control (RBAC)
- Middleware Design
- MongoDB Relationships
- Express Best Practices
- TypeScript Backend Development
- Redis Integration
- Production-Oriented Folder Structure

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Shiwank Aks**

- GitHub: https://github.com/ShiwankAks
- LinkedIn: https://www.linkedin.com/in/shiwank-aks/

---

⭐ If you found this project helpful, consider giving it a star!