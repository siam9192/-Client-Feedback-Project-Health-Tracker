#  Project Management & Health Monitoring System

## Project Overview

This project is a **Project Management and Monitoring System** designed to track project progress, employee check-ins, client feedback, risks, and overall project health.

The system automatically calculates a **Project Health Score (0–100)** based on real project data such as client satisfaction, employee confidence, progress vs timeline, and active risks or issues.  
Based on this score, each project is categorized as **On Track**, **At Risk**, or **Critical**.

The platform supports **role-based access** for Admins, Employees, and Clients, ensuring secure and relevant interactions for each user type.

---

##  Tech Stack Used

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod (schema validation)

### Backend
- Node.js
- Express.js (REST API)
- MongoDB with Mongoose
- JWT Authentication



---

##  Backend Choice

**Backend Framework:**  Express.js (REST API)


## Setup Instructions

### Clone the Repository
```bash

git clone https://github.com/siam9192/Client-Feedback-Project-Health-Tracker.git

```
### Backend

#### Setup Environment Variables

Create a `.env` file in the root folder of the project and update it with your own values:

```bash
ENVIRONMENT="Development" # or "Production"
DATABASE_URL=your_mongodb_db_url
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_ACCESS_TOKEN_EXPIRE=2d
JWT_REFRESH_TOKEN_EXPIRE=30d
CLIENT_ORIGIN="client url"

```
```bash
cd project-name/backend

# Install dependencies
npm install

# Start the backend server
npm run dev
```

### Frontend
```bash
cd ../frontend
npm install
npm run dev 
```

#### Setup Environment Variables

Create a `.env` file in the root folder of the project and update it with your own values:


```bash

NEXT_PUBLIC_API_BASE_URL = "server api url"

```

## Databse Seeding

The project includes a seed script to populate the database with **initial demo data** (users, projects, riks).

### Location
/backend/src/seed/script.ts


###  Run Seed Script

```bash
npm run seed
```

## API Contract

This document describes the API endpoints for the project.

##  API Endpoints

###  Authentication
| Method | Endpoint                | Description                              |
| ------ | ----------------------- | ---------------------------------------- |
| POST   | `/api/auth/login`       | Login user                               |
| POST   | `/api/auth/register`    | Register new user                        |
| GET    | `/api/auth/accesstoken` | Get new access token using refresh token |



###  User Management
| Method | Endpoint                | Description                                                                  |
| ------ | ----------------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/users/me`         | Get current logged-in user                                                    |
| PUT    | `/api/users/me`         | Update current user profile                                                   |
| GET    | `/api/users/visible`    | Get users with **active** account status (authenticated users only)           |


###  Task Management
| Method | Endpoint                 | Description                            |
| ------ | ------------------------ | -------------------------------------- |
| GET    | `/api/tasks/created`     | Get all tasks created by the user      |
| GET    | `/api/tasks/assigned`    | Get all tasks assigned to the user     |
| GET    | `/api/tasks/overdue`     | Get all overdue tasks                  |
| POST   | `/api/tasks`             | Create a new task                      |
| PUT    | `/api/tasks/:id`         | Update a task                          |
| DELETE | `/api/tasks/:id`         | Delete a task                          |


###  Notifications
| Method | Endpoint                           | Description                           |
| ------ | ---------------------------------- | ------------------------------------- |
| GET    | `/api/notifications`               | Get current user notifications        |
| PATCH  | `/api/notifications/mark-read`




##  Demo Login Credentials

###  Admin
- **Email:** admin@example.com  
- **Password:** Admin@123  

###  Employee
- **Email:** employee@example.com  
- **Password:** Employee@123  

###  Client
- **Email:** client@example.com  
- **Password:** Client@123  



##  Project Health Score Calculation Factors



The Health Score is calculated using **four weighted components**:



### Recent Client Satisfaction (30%)

- Calculated using the **average client feedback ratings** from the **last 2 weeks**
- Rating scale: **1–5**
- Converted to percentage:


**If no client feedback exists:**
- If the project has just started → **0 points**
- Otherwise → apply a **penalty score** (e.g., **50 points**)

---

###  Recent Employee Confidence (20%)

- Calculated using the **average confidence level** from employee check-ins during the **last 2 weeks**
- Converted to percentage

**If no employee check-ins exist:**
- If the project has not started → **0 points**
- Otherwise → apply a **penalty score** (e.g., **50 points**)

---

###  Project Progress (25%)

- Compares **actual completion percentage** with **expected progress**
- Expected progress is calculated based on:
- Project start date
- Project end date
- Elapsed time

**Penalty Logic:**
- Projects falling behind schedule are penalized
- Example:
- **−2 points for every 1% behind expected progress**

---

###  Risks and Issues (25%)

Points are deducted based on **open risks and issues**:

**Risk Severity Penalties:**
- High → **−15 points**
- Medium → **−10 points**
- Low → **−5 points**

**Client-Flagged Issues:**
- **−10 points per issue**

**Additional Rules:**
- Extra penalties are applied if **high-severity risks occur early** in the project lifecycle

---

##  Final Score Calculation

- Each component is weighted according to its percentage
- The final score is calculated as a **weighted average**
- The result is **clamped between 0 and 100**

---

##  Health Status Interpretation

| Score Range | Status |
|------------|--------|
| 80 – 100 | 🟢 On Track |
| 60 – 79 | 🟡 At Risk |
| Below 60 | 🔴 Critical |

When the project health status changes:
- The project status is updated automatically
- An activity log entry is created for tracking and audit purposes