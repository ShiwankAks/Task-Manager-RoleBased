# 🚀 Task Manager – Role Based Access Control (RBAC)

> A production-oriented full-stack task management application built with React, TypeScript, Express, MongoDB Atlas, and Upstash Redis. The application implements JWT authentication, Role-Based Access Control (RBAC), protected REST APIs, Redis-based rate limiting, and containerized deployment using Docker and Docker Compose.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Express-5-black?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb" />
  <img src="https://img.shields.io/badge/Redis-Upstash-red?logo=redis" />
  <img src="https://img.shields.io/badge/Docker-Containerized-blue?logo=docker" />
  <img src="https://img.shields.io/badge/Docker%20Compose-Orchestration-blue?logo=docker" />
  <img src="https://img.shields.io/badge/Nginx-Frontend-green?logo=nginx" />
  <img src="https://img.shields.io/badge/JWT-Authentication-orange" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

---

## 📖 Overview

Task Manager is a role-based task management platform where users are assigned different roles with different permissions.

The backend is built with **Node.js, Express, TypeScript, MongoDB Atlas, JWT authentication, RBAC, and Upstash Redis**. The frontend is built with **React, TypeScript, Vite, Tailwind CSS, React Router, and Axios**.

The application is also containerized using **Docker and Docker Compose**.

The frontend is built into production-ready static assets and served through **Nginx**, while the backend runs in a Node.js container.

MongoDB Atlas and Upstash Redis remain managed external services and are accessed by the backend through environment variables.

### Key concepts demonstrated

* JWT Authentication
* Role-Based Access Control
* Protected REST APIs
* Middleware Architecture
* Secure Password Hashing
* Redis Rate Limiting
* MongoDB Data Persistence
* Environment-Based Configuration
* Docker Containerization
* Docker Compose
* Multi-Stage Docker Builds
* Nginx Static File Serving
* React SPA Routing

---

# ✨ Features

## 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* JWT Verification Middleware
* Logout

---

## 👥 Role-Based Access Control

Three user roles are supported:

| Role         | Permissions                     |
| ------------ | ------------------------------- |
| **Admin**    | Full system access              |
| **Manager**  | Manage tasks and view employees |
| **Employee** | View and update assigned tasks  |

Authorization is enforced at the backend through role-based middleware rather than relying only on frontend restrictions.

---

## ✅ Task Management

* Create Tasks
* Delete Tasks
* Assign Tasks
* Change Task Priority
* Update Task Status
* View Assigned Tasks
* View All Tasks

---

## 👨‍💼 User Management

### Admin

* View users
* Delete users
* Change user roles
* Create and manage tasks

### Manager

* View employees
* View and manage tasks
* Change task priority

### Employee

* View assigned tasks
* Update task status

---

# 🛡 Security Features

* JWT Authentication
* bcrypt Password Hashing
* Role-Based Authorization
* Helmet Security Headers
* CORS Configuration
* Input Validation
* Redis-Based Rate Limiting
* Protected REST Endpoints
* Environment-Based Secret Management

---

# 🐳 Docker & Containerization

The application is containerized using **Docker and Docker Compose**.

The frontend and backend run as separate containers:

```text
                    Docker Compose
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
       Frontend Container     Backend Container
       React + Nginx          Node + Express
       Port 80                Port 3000
              │                     │
              │              ┌──────┴──────┐
              │              ▼             ▼
              │       MongoDB Atlas   Upstash Redis
              │        Database       Rate Limiting
              │
              ▼
           Browser
```

### Frontend Container

The React application uses a **multi-stage Docker build**:

```text
React Source
     │
     ▼
Node.js Build Stage
     │
     │ npm run build
     ▼
   dist/
     │
     ▼
Nginx Production Stage
     │
     ▼
   Browser
```

Nginx serves the generated React production files.

A custom Nginx configuration is also used so that React Router routes such as:

```text
/login
/admin-dashboard
/tasks
```

continue to work correctly after browser refreshes.

### Backend Container

The backend runs using Node.js and Express:

```text
Node.js
   │
   ▼
Express + TypeScript
   │
   ├── JWT Authentication
   ├── RBAC
   ├── REST APIs
   ├── Rate Limiting
   │
   ├──────────► MongoDB Atlas
   │
   └──────────► Upstash Redis
```

### Managed Services

MongoDB and Redis are **not run as Docker containers**.

The application uses:

* **MongoDB Atlas** for database storage
* **Upstash Redis** for rate limiting

The backend connects to both services using environment variables.

---

# 🏗 Tech Stack

## Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* React Hot Toast

## Backend

* Node.js
* Express 5
* TypeScript
* MongoDB Atlas
* Mongoose
* Upstash Redis
* JWT
* bcrypt
* Helmet
* CORS

## DevOps / Infrastructure

* Docker
* Docker Compose
* Nginx
* Multi-Stage Docker Builds
* Environment-Based Configuration

---

# 📂 Project Structure

```text
Task-Manager/
│
├── frontend/
│   ├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.tsx
│   ├── Dockerfile
│   ├── .dockerignore
│   └── nginx.conf
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── mongodb.ts
│   │   │   └── redis.ts
│   │   │
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts
│   │   │   ├── roleMiddleware.ts
│   │   │   └── rateLimiter.ts
│   │   │
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .env
│
├── docker-compose.yml
└── README.md
```

> `.env` files containing secrets should never be committed to the repository.

---

# 🏛 Backend Architecture

```text
                       Client
                         │
                         ▼
                  Express Server
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
      Authentication           Rate Limiter
             │                       │
             ▼                       ▼
      JWT Verification        Upstash Redis
             │
             ▼
      Role Authorization
             │
             ▼
        Controllers
             │
             ▼
      MongoDB Atlas
```

---

# 🔐 Authorization Flow

```text
Login
  │
  ▼
Generate JWT
  │
  ▼
Client Stores Token
  │
  ▼
Protected API Request
  │
  ▼
Verify JWT
  │
  ▼
Check User Role
  │
  ▼
Authorized?
  │          │
 Yes        No
  │          │
  ▼          ▼
Controller   403 Forbidden
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

---

## User

| Method | Endpoint                    | Access         |
| ------ | --------------------------- | -------------- |
| GET    | `/api/user/all-users`       | Admin, Manager |
| DELETE | `/api/user/delete-user/:id` | Admin          |
| PATCH  | `/api/user/change-role/:id` | Admin          |

---

## Tasks

| Method | Endpoint                          | Access         |
| ------ | --------------------------------- | -------------- |
| POST   | `/api/user/add-task`              | Admin          |
| GET    | `/api/user/all-task`              | Admin, Manager |
| GET    | `/api/user/my-task`               | Employee       |
| PATCH  | `/api/user/change-priority/:id`   | Admin, Manager |
| PATCH  | `/api/user/change-status/:taskId` | Employee       |
| DELETE | `/api/user/delete/:id`            | Admin          |

---

# 🔑 Environment Variables

## Backend

Create:

```text
backend/.env
```

```env
PORT=3000

MONGODB_URI=your_mongodb_atlas_uri

JWT_SECRET=your_secret

CLIENT_URL=http://localhost:5173

REDIS_URL=your_upstash_redis_url
```

## Frontend

Create:

```text
frontend/.env
```

```env
VITE_API_URL=http://localhost:3000/api
```

### Production

Production environment variables should be configured through the deployment platform rather than committed to Git.

The current production deployment uses:

```text
Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
Redis    → Upstash
```

Local Docker environment variables can therefore be different from production values.

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/ShiwankAks/Task-Manager-RoleBased.git

cd Task-Manager-RoleBased
```

---

# 💻 Run Without Docker

## Backend

```bash
cd backend

npm install

npm run dev
```

Backend:

```text
http://localhost:3000
```

## Frontend

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🐳 Run With Docker

Make sure Docker Desktop is running.

From the project root:

```bash
docker compose up --build
```

Docker Compose will:

1. Build the backend image
2. Build the frontend image
3. Create the frontend container
4. Create the backend container
5. Create a Docker network
6. Start both containers

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:3000
```

### Check running containers

```bash
docker compose ps
```

### View logs

```bash
docker compose logs
```

Backend logs:

```bash
docker compose logs backend
```

Frontend logs:

```bash
docker compose logs frontend
```

### Stop containers

```bash
docker compose down
```

### Start in background

```bash
docker compose up -d
```

---

# 🔒 Environment & Secrets

Sensitive environment variables should never be committed to GitHub.

The following should remain local or be configured through the deployment platform:

```text
MONGODB_URI
REDIS_URL
JWT_SECRET
```

Use `.env.example` files to document required variables without exposing real credentials.

---

# 🔄 Deployment Architecture

The project supports both traditional cloud deployment and local containerized deployment.

### Production

```text
                    Users
                      │
                      ▼
                   Vercel
                 Frontend
                      │
                      ▼
                  Render
                 Backend
                  │    │
                  ▼    ▼
             MongoDB   Upstash
               Atlas    Redis
```

### Local Docker

```text
                   Browser
                      │
                      ▼
             Frontend Container
                  Nginx
                 :5173
                      │
                      ▼
             Backend Container
                Express
                 :3000
                  │    │
                  ▼    ▼
             MongoDB   Upstash
               Atlas    Redis
```

Docker configuration is used for local containerized execution and does not replace the existing Vercel/Render deployment configuration.

---

# 🔒 Middleware Used

* Authentication Middleware
* JWT Verification Middleware
* Role Authorization Middleware
* Redis Rate Limiter
* Helmet
* CORS
* JSON Parser

---

# 🚀 Future Improvements

* Refresh Token Authentication
* Email Verification
* Password Reset
* Swagger / OpenAPI Documentation
* Unit & Integration Testing
* Activity Logs
* Audit Trail
* WebSocket Notifications
* File Uploads
* Search & Filtering
* Pagination
* Soft Delete
* Zod Validation
* Redis Caching
* CI/CD Pipeline
* Automated Docker Image Deployment

---

# 💡 Key Learning Outcomes

This project demonstrates practical implementation of:

* RESTful API Design
* JWT Authentication
* Role-Based Access Control (RBAC)
* Middleware Design
* Secure Password Storage
* MongoDB & Mongoose
* TypeScript Backend Development
* Redis Integration
* Redis-Based Rate Limiting
* CORS & Security Headers
* Environment-Based Configuration
* Docker Containerization
* Docker Compose
* Multi-Stage Docker Builds
* Nginx Configuration
* React SPA Routing
* Production-Oriented Application Architecture

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

* GitHub: https://github.com/ShiwankAks
* LinkedIn: https://www.linkedin.com/in/shiwank-aks/

---

⭐ If you found this project helpful, consider giving it a star!