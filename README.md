# Task Management System

A modern **Role-Based Task Management System** built with the **MERN Stack** (React, Node.js, Express, MongoDB) using **TypeScript**. The application enables organizations to manage employees, assign tasks, track progress, and control user permissions through a secure role-based authentication system.

---

## Features

### Authentication & Authorization

- JWT-based authentication
- Secure password hashing using bcrypt
- Protected API routes
- Role-Based Access Control (RBAC)

### User Roles

#### Admin

- Create and assign tasks
- Delete tasks
- Delete users
- Change user roles
- View all users
- View all tasks

#### Manager

- View all users
- View all tasks
- Update task priorities

#### Employee

- View assigned tasks
- Update task status

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Axios
- React Hot Toast

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## Project Structure

```text
Task-Manager/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── types/
│   └── package.json
│
└── README.md
```

---

## Core Functionalities

### Authentication

- User Registration
- User Login
- JWT Token Generation
- Protected Routes

### Task Management

- Create Tasks
- Assign Tasks
- Update Task Status
- Change Task Priority
- Delete Tasks
- View Personal Tasks
- View Organization Tasks

### User Management

- View Users
- Delete Users
- Update User Roles

---

## API Overview

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |

---

### Users

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | `/user/all-users` | Admin, Manager |
| DELETE | `/user/delete-user/:id` | Admin |
| POST | `/user/change-role/:id` | Admin |

---

### Tasks

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | `/user/add-task` | Admin |
| GET | `/user/all-task` | Admin, Manager |
| GET | `/user/my-task` | Employee |
| POST | `/user/change-status/:taskId` | Employee |
| POST | `/user/change-priority/:id` | Admin, Manager |
| DELETE | `/user/delete/:id` | Admin |

---

## Installation

### Clone Repository

```bash

cd task-manager
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies

```bash
npm install
```

or

```bash
bun install
```

Create a `.env` file

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run development server

```bash
npm run start
```

or

```bash
bun run dev
```

---

## Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Run

```bash
npm run dev
```

---

## Security Features

- Password hashing using bcrypt
- JWT Authentication
- Protected API routes
- Role-based authorization middleware
- Environment variable configuration
- Secure middleware architecture

---

## Tech Concepts Demonstrated

- REST API Development
- JWT Authentication
- Role-Based Access Control (RBAC)
- Express Middleware
- MongoDB Relationships
- React State Management
- API Integration using Axios
- TypeScript
- Modular Folder Structure
- CRUD Operations

---

## Future Improvements

- Refresh Token Authentication
- Email Verification
- Password Reset
- File Attachments
- Comments on Tasks
- Activity Logs
- Search & Filtering
- Pagination
- Dashboard Analytics
- Notifications
- Unit & Integration Tests
- Docker Support
- CI/CD Pipeline
- AWS Deployment

---

## Environment Variables

### Backend

```env
PORT=

MONGODB_URI=

JWT_SECRET=
```

### Frontend

```env
VITE_API_URL=
```

---

## Deployment

Frontend can be deployed using:

- Vercel
- Netlify

Backend can be deployed using:

- Render
- Railway
- AWS EC2
- DigitalOcean

Database:

- MongoDB Atlas

---

## Author

**Shiwank Aks**

Full Stack Developer (MERN)

GitHub: https://github.com/ShiwankAks

LinkedIn: https://linkedin.com/in/shiwank-aks/

---

## License

This project is licensed under the MIT License.