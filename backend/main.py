from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="Task Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    id: Optional[str] = None
    title: str
    description: str = ""
    completed: bool = False

tasks_db: List[dict] = []

@app.get("/")
def root():
    return {"message": "Task Manager API running"}

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return tasks_db

@app.post("/tasks", response_model=Task)
def create_task(task: Task):
    task.id = str(uuid.uuid4())
    tasks_db.append(task.dict())
    return task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, updated: Task):
    for i, t in enumerate(tasks_db):
        if t["id"] == task_id:
            updated.id = task_id
            tasks_db[i] = updated.dict()
            return updated
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    for i, t in enumerate(tasks_db):
        if t["id"] == task_id:
            tasks_db.pop(i)
            return {"message": "Deleted"}
    raise HTTPException(status_code=404, detail="Task not found")