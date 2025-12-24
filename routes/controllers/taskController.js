const { readDB, writeDB } = require("../utils/localStorage");

// CREATE TASK
exports.createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const db = readDB();

  const newTask = {
    id: Date.now(),
    userId: req.user.id,
    title,
    description: description || "",
    completed: false,
    createdAt: new Date(),
  };

  db.tasks.push(newTask);
  writeDB(db);

  res.status(201).json({ message: "Task created", task: newTask });
};

// GET ALL TASKS (USER SPECIFIC)
exports.getTasks = (req, res) => {
  const db = readDB();

  const userTasks = db.tasks.filter(
    (task) => task.userId === req.user.id
  );

  res.json(userTasks);
};

// UPDATE TASK
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const db = readDB();
  const taskIndex = db.tasks.findIndex(
    (t) => t.id == id && t.userId === req.user.id
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  db.tasks[taskIndex] = {
    ...db.tasks[taskIndex],
    title: title ?? db.tasks[taskIndex].title,
    description: description ?? db.tasks[taskIndex].description,
    completed: completed ?? db.tasks[taskIndex].completed,
  };

  writeDB(db);
  res.json({ message: "Task updated", task: db.tasks[taskIndex] });
};

// DELETE TASK
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const db = readDB();
  const filteredTasks = db.tasks.filter(
    (t) => !(t.id == id && t.userId === req.user.id)
  );

  if (filteredTasks.length === db.tasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }

  db.tasks = filteredTasks;
  writeDB(db);

  res.json({ message: "Task deleted" });
};
