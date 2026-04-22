# Task Manager — Full-Stack Web App

A full-stack task management application built with FastAPI and React TypeScript.

## Live Demo
- Frontend: https://task-manager-q6ha0m1ek-ash-key19s-projects.vercel.app
- API Docs: https://task-manager-api-l08d.onrender.com/docs

## Tech Stack
- **Backend:** Python, FastAPI, Pydantic, Uvicorn
- **Frontend:** React, TypeScript, Vite, Axios
- **Deployment:** Render (backend), Vercel (frontend)

## Features
- Create, update, delete tasks via REST API
- Mark tasks complete/incomplete
- Auto-generated API documentation (Swagger UI)
- CORS-enabled for cross-origin requests

## Run Locally
# Backend
cd backend && pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend && npm install && npm run dev

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| POST | /tasks | Create task |
| PUT | /tasks/{id} | Update task |
| DELETE | /tasks/{id} | Delete task |
