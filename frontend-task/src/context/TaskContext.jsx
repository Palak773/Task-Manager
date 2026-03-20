import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTaskApi,
  deleteTaskApi,
  toggleTaskApi,
} from "../api/taskApi";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const fetchAllTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      showToast("Failed to fetch tasks", "error");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const res = await createTask(taskData);
      setTasks((prev) => [...prev, res.task]);
      showToast("Task added successfully");
    } catch (error) {
      showToast("Failed to add task", "error");
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const res = await updateTaskApi(id, updatedData);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? res.task : task))
      );
      showToast("Task updated successfully");
    } catch (error) {
      showToast("Failed to update task", "error");
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      showToast("Task deleted successfully");
    } catch (error) {
      showToast("Failed to delete task", "error");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await toggleTaskApi(id);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? res.task : task))
      );
      showToast("Task status updated");
    } catch (error) {
      showToast("Failed to update status", "error");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        toast,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        fetchAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}