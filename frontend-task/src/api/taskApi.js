const API_URL = "http://localhost:5000/api/tasks";

export async function getTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(taskData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTaskApi(id, taskData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTaskApi(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
}

export async function toggleTaskApi(id) {
  const res = await fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
}