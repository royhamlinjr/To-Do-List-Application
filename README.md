# To-Do App

A full-stack To-Do application built with React, TypeScript, Tailwind CSS, FastAPI, and MongoDB. Users can create tasks, view saved tasks, mark them as completed, and delete them.

## Features

- Create and view tasks
- Mark tasks as completed or pending
- Delete tasks
- Store tasks persistently in MongoDB
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

- Python 3.11 or a compatible version supported by the backend dependencies
- Node.js and npm
- A MongoDB database, such as MongoDB Atlas

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd To_Do_App
```

### 2. Configure the backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory using `.env.example` as a reference. Configure your MongoDB connection string and any required database settings.

Never commit your real database credentials.

### 3. Start the backend

From the `backend` directory, run:

```powershell
uvicorn main:app --reload
```

Backend API: `http://127.0.0.1:8000`

Interactive API documentation: `http://127.0.0.1:8000/docs`

### 4. Configure the frontend

Open a separate terminal:

```powershell
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory using `.env.example` as a reference.

```dotenv
VITE_API_URL=http://127.0.0.1:8000
```

### 5. Start the frontend

```powershell
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

### 6. Build for production

From the `frontend` directory:

```powershell
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/health/db` | Check database connectivity |
| GET | `/tasks` | Retrieve tasks |
| POST | `/tasks` | Create a task |
| PATCH | `/tasks/{task_id}` | Update completion status |
| DELETE | `/tasks/{task_id}` | Delete a task |

## Environment Variables

- Backend: MongoDB connection string and database configuration required by the application.
- Frontend: `VITE_API_URL`, the base URL of the backend API.

Keep real credentials in local environment files and out of version control.

## Future Improvements

- Task editing
- Due dates and priorities
- Task filtering and search
- Automated tests
- Deployment configuration

## Author

Roy Hamlin A