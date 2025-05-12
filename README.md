# Student CRUD Application

A full-stack web application for managing student records with a modern React frontend and Node.js backend.

## Project Structure

The project is divided into two main parts:

- `frontend/`: React-based user interface
- `backend-mysql/`: Node.js backend with MySQL database

## Frontend Technologies

- React 19
- React Bootstrap for UI components
- React Router for navigation
- Axios for API calls
- React Toastify for notifications
- Vite as the build tool

## Backend Technologies

- Node.js with Express
- MySQL database
- JWT for authentication
- Bcrypt for password hashing
- CORS enabled for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- MySQL server
- npm or yarn package manager

### Quick Start

1. Install all dependencies (frontend, backend, and root):

   ```bash
   npm run install-all
   ```

2. Start both frontend and backend servers with a single command:
   ```bash
   npm start
   ```

### Manual Setup

#### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

#### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend-mysql
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your MySQL database connection in the backend configuration

4. Start the backend server:
   ```bash
   npm start
   ```

## Features

- Student record management (Create, Read, Update, Delete)
- Secure authentication system
- Responsive design
- Real-time notifications
- RESTful API architecture

## Development

- Frontend runs on `http://localhost:5173` by default
- Backend API runs on `http://localhost:3000` by default

## License

This project is licensed under the ISC License.
