# 📝 Task Manager App

## 📌 Description
A full-stack Task Manager application where users can create, update, delete, and manage tasks with different statuses.

---

## 🚀 Tech Stack

### Frontend
- React (Context API)
- Custom UI (Dark theme)

### Backend
- Node.js
- Express.js

### Tools
- Postman (API testing)

---

## ✨ Features

- Add new tasks
- Edit tasks
- Delete tasks
- Toggle task completion
- Status types:
  - Open
  - In Progress
  - Done
- Search tasks
- Filter tasks
- Responsive UI

---

## 🔌 API Endpoints

### Get all tasks
GET /api/tasks

### Create task
POST /api/tasks

Body:
{
  "title": "Task title",
  "description": "Task description",
  "status": "open"
}

### Update task
PUT /api/tasks/:id

### Delete task
DELETE /api/tasks/:id

### Toggle task status
PATCH /api/tasks/:id/toggle

---

## ⚠️ Validation
- Task title cannot be empty

---

## 🧪 API Testing
All endpoints tested using Postman.

---

## ▶️ Run Project Locally

### Backend
cd backend-task  
npm install  
npm run dev  

### Frontend
cd frontend-task  
npm install  
npm start  

---

## 📸 Screenshots
(Add your UI screenshots here)

---

## 👩‍💻 Author
Palak Gupta