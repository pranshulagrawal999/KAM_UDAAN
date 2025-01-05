# Udaan Lead Management System

## Project Overview
Udaan, a B2B e-commerce platform, requires a Lead Management System for Key Account Managers (KAMs) who manage relationships with large restaurant accounts. This system will help track and manage leads, interactions, and account performance.
---
## Live Demo
Access the live versions of the frontend and backend applications through the links below:

- **Frontend Application**: [https://kam1101.netlify.app/](https://kam1101.netlify.app/)
---
## System Requirements
### Backend
- **Node.js**: v16 or later
- **MongoDB**: v4.0 or later
- **npm/yarn**: v7 or later

### Frontend
- **React**: v18 or later
- **Node.js**: v16 or later
- **npm/yarn**: v7 or later

---

## Installation Instructions
### 1. Clone the Repository
```bash
$ git clone <repository_url>
$ cd Lead_management_system
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   $ cd backend
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Configure `.env` file with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/udaan
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   $ npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   $ cd frontend
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Start the frontend server:
   ```bash
   $ npm start
   ```

---

## Running Instructions
### Start Backend
```bash
$ cd backend
$ npm run dev
```

### Start Frontend
```bash
$ cd frontend
$ npm start
```

Access the application at `http://localhost:3000`.

---

## Test Execution Guide
### Backend Tests
1. Navigate to the backend directory:
   ```bash
   $ cd backend
   ```
2. Run tests:
   ```bash
   $ npm test
   ```

### Frontend Tests
1. Navigate to the frontend directory:
   ```bash
   $ cd frontend
   ```
2. Run tests:
   ```bash
   $ npm test
   ```

---

## API Documentation
### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login with email and password.

### Restaurants
- **GET** `/api/restaurants`: Fetch all restaurants.
- **POST** `/api/restaurants`: Create a new restaurant.
- **PUT** `/api/restaurants/:id`: Update a restaurant.
- **DELETE** `/api/restaurants/:id`: Delete a restaurant.

### Performance
- **GET** `/api/performance`: Fetch performance metrics for the current month.

### Interactions
- **GET** `/api/calls/today`: Fetch today’s interactions (calls, emails, orders).

---

## Sample Usage Examples
### Fetch Today’s Tasks
Request:
```bash
GET /api/calls/today
Authorization: Bearer <token>
```
Response:
```json
{
  "interactions": [
    {
      "_id": "12345",
      "type": "Call",
      "restaurantName": "ABC Restaurant",
      "contactName": "John Doe",
      "time": "10:00",
      "status": "Pending"
    }
  ]
}
```

---

## Code Setup Process
1. Clone the repository.
2. Set up environment variables in the backend.
3. Install dependencies for both backend and frontend.
4. Start both servers.

---

## Application Running
1. Access the app at `http://localhost:3000`.
2. Register or login as a user.
3. Navigate to the dashboard to view and manage tasks and performance metrics.

---

## Major Features Demonstration
### Task Management
- View and manage tasks (calls, emails, orders) for the day.
- Track completed and pending tasks.

### Performance Metrics
- Identify well-performing and underperforming accounts.
- View aggregated interaction data for the current month.

### User Management
- Register and log in securely.
- Assign restaurants to KAMs and reassign as needed.

---

## Sample Inputs/Outputs
### Create a Restaurant
Request:
```json
{
  "name": "XYZ Restaurant",
  "address": "123 Main Street",
  "city": "Metropolis",
  "state": "NY",
  "zipcode": "12345",
  "status": "Active"
}
```
Response:
```json
{
  "message": "Restaurant created successfully.",
  "data": {
    "_id": "12345",
    "name": "XYZ Restaurant",
    ...
  }
}
```

---

## Accessible Location
Project Repository: `<https://github.com/pranshulagrawal999/KAM_UDAAN>`
`
