
import os
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from pymongo import MongoClient
from pymongo.errors import PyMongoError

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "aminoid_todo")

client = None
database = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, database

    if not MONGODB_URI:
        raise RuntimeError("MONGODB_URI is missing from .env")

    client = MongoClient(
        MONGODB_URI,
        serverSelectionTimeoutMS=5000,
    )
    database = client[DATABASE_NAME]

    try:
        client.admin.command("ping")
        print("MongoDB connected successfully")
        yield
    finally:
        client.close()


app = FastAPI(
    title="Aminoid AI To-Do API",
    description="A simple task management API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)


class TaskUpdate(BaseModel):
    completed: bool


def serialize_task(task):
    return {
        "id": str(task["_id"]),
        "title": task["title"],
        "completed": task["completed"],
        "created_at": task["created_at"].isoformat(),
    }


@app.get("/")
def read_root():
    return {"message": "Aminoid AI To-Do API is running"}


@app.get("/health/db")
def check_database():
    try:
        client.admin.command("ping")
        return {"database": "connected"}
    except PyMongoError:
        raise HTTPException(
            status_code=503,
            detail="Database connection failed",
        )


@app.post("/tasks", status_code=status.HTTP_201_CREATED)
def create_task(task_data: TaskCreate):
    title = task_data.title.strip()

    if not title:
        raise HTTPException(
            status_code=422,
            detail="Task title cannot be empty",
        )

    task = {
        "title": title,
        "completed": False,
        "created_at": datetime.now(timezone.utc),
    }

    try:
        result = database.tasks.insert_one(task)
        task["_id"] = result.inserted_id
        return serialize_task(task)
    except PyMongoError:
        raise HTTPException(
            status_code=503,
            detail="Could not create task",
        )


@app.get("/tasks")
def get_tasks():
    try:
        tasks = database.tasks.find().sort("created_at", -1)
        return [serialize_task(task) for task in tasks]
    except PyMongoError:
        raise HTTPException(
            status_code=503,
            detail="Could not retrieve tasks",
        )


@app.patch("/tasks/{task_id}")
def update_task(task_id: str, task_data: TaskUpdate):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid task ID",
        )

    try:
        result = database.tasks.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"completed": task_data.completed}},
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Task not found",
            )

        task = database.tasks.find_one({"_id": ObjectId(task_id)})
        return serialize_task(task)
    except PyMongoError:
        raise HTTPException(
            status_code=503,
            detail="Could not update task",
        )


@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid task ID",
        )

    try:
        result = database.tasks.delete_one(
            {"_id": ObjectId(task_id)}
        )

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Task not found",
            )

        return {"message": "Task deleted successfully"}
    except PyMongoError:
        raise HTTPException(
            status_code=503,
            detail="Could not delete task",
        )
