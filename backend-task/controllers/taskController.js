let tasks = [];

// Get all tasks
const getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};

// Create task
const createTask = (req, res) => {
  const { title, description, status } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  const allowedStatuses = ["open", "in-progress", "done"];

  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    description: description ? description.trim() : "",
    status: allowedStatuses.includes(status) ? status : "open",
    created_at: new Date().toISOString(),
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task: newTask,
  });
};

// Update task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title cannot be empty",
    });
  }

  const allowedStatuses = ["open", "in-progress", "done"];

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title !== undefined ? title.trim() : tasks[taskIndex].title,
    description:
      description !== undefined
        ? description.trim()
        : tasks[taskIndex].description,
    status:
      status !== undefined && allowedStatuses.includes(status)
        ? status
        : tasks[taskIndex].status,
  };

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task: tasks[taskIndex],
  });
};

// Delete task
const deleteTask = (req, res) => {
  const { id } = req.params;

  const taskExists = tasks.find((task) => task.id === id);

  if (!taskExists) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  tasks = tasks.filter((task) => task.id !== id);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

// Toggle task status
const toggleTaskStatus = (req, res) => {
  const { id } = req.params;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  task.status = task.status === "done" ? "open" : "done";

  res.status(200).json({
    success: true,
    message: "Task status updated successfully",
    task,
  });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
};