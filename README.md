# To-Do App

A full-stack To-Do application built with React, TypeScript, Tailwind CSS, FastAPI, and MongoDB Atlas. Users can create tasks, view saved tasks, mark tasks as completed or pending, and delete tasks with persistent database storage.

## Live Demo

- **Frontend:** https://frontend-orpin-xi-37.vercel.app/
- **Backend Health Check:** https://to-do-list-application-m6h6.onrender.com/health/db
- **GitHub Repository:** https://github.com/royhamlinjr/To-Do-List-Application

## Features

- Create and view tasks
- Mark tasks as completed or pending
- Delete tasks
- Persist task data in MongoDB Atlas
- Display task statistics
- Show backend connection status
- Validate empty task submissions
- Responsive user interface

## Tech Stack

**Frontend**
- React
- TypeScript
- Tailwind CSS
- Vite

**Backend**
- Python
- FastAPI
- PyMongo

**Database**
- MongoDB Atlas

## Project Structure

```text
To_Do_App/
├── backend/
│   ├── main.py
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## Prerequisites

- Python version compatible with the backend dependencies
- Node.js and npm
- A MongoDB database, such as MongoDB Atlas

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/royhamlinjr/To-Do-List-Application.git
cd To-Do-List-Application
```

### 2. Configure the Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` directory using `.env.example` as a reference. Add your MongoDB connection string and the database configuration required by the application.

Never commit real database credentials.

### 3. Start the Backend

From the `backend` directory, run:

```bash
uvicorn main:app --reload
```

- Backend URL: http://127.0.0.1:8000
- Interactive API documentation: http://127.0.0.1:8000/docs
- Database health check: http://127.0.0.1:8000/health/db

### 4. Configure the Frontend

Open a separate terminal and run:

```powershell
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory using `.env.example` as a reference.

Add the following configuration for local development:

```dotenv
VITE_API_URL=http://127.0.0.1:8000
```

### 5. Start the Frontend

From the `frontend` directory, run:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually http://localhost:5173.

### 6. Build for Production

From the `frontend` directory, run:

```bash
npm run build
```

The production build is generated in the `dist` directory.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/health/db` | Check database connectivity |
| GET | `/tasks` | Retrieve tasks |
| POST | `/tasks` | Create a task |
| PATCH | `/tasks/{task_id}` | Update task completion status |
| DELETE | `/tasks/{task_id}` | Delete a task |

## Environment Variables

**Backend:** Configure the MongoDB connection string and any database settings required by the application in `backend/.env`.

**Frontend:** Set `VITE_API_URL` to the backend's base URL.

For local development:

```dotenv
VITE_API_URL=http://127.0.0.1:8000
```

For production, configure `VITE_API_URL` in the Vercel project environment variables using the deployed Render backend URL.

Keep real credentials in environment files and exclude them from version control.

## Future Improvements

- Task editing
- Due dates and priorities
- Task filtering and search
- Automated tests

## Author

**Roy Hamlin A**

