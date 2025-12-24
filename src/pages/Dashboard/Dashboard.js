import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import TaskCard from "../../components/Task/TaskCard";
import {
  fetchTasks,
  createTask,
  deleteTask,
  toggleTask,
} from "../../services/api";

const motivationalQuotes = [
  "🎯 Great job! Keep it up!",
  "💪 You're doing amazing!",
  "🔥 On fire today!",
  "✨ Task completed! Well done!",
  "🌟 Keep shining!",
];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [time, setTime] = useState("");

  // Notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Load tasks from backend
  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data.tasks || []);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Reminder checker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setTasks((prev) =>
        prev.map((task) => {
          if (
            task.time &&
            !task.notified &&
            new Date(task.time) <= now
          ) {
            if (Notification.permission === "granted") {
              new Notification("⏰ Task Reminder", {
                body: `${task.title} — ${task.description}`,
              });
            }
            return { ...task, notified: true };
          }
          return task;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await createTask({
      title,
      description,
      priority,
      time,
    });

    setTasks((prev) => [res.task, ...prev]);

    setTitle("");
    setDescription("");
    setPriority("");
    setTime("");
  };

  // DELETE ✅ FIXED (_id)
  const handleDelete = async (_id) => {
    await deleteTask(_id);
    setTasks((prev) => prev.filter((task) => task._id !== _id));
  };

  // TOGGLE DONE ✅ FIXED (_id)
  const handleToggle = async (_id) => {
    await toggleTask(_id);

    setTasks((prev) =>
      prev.map((task) => {
        if (task._id === _id) {
          if (!task.completed) {
            const quote =
              motivationalQuotes[
                Math.floor(Math.random() * motivationalQuotes.length)
              ];
            setTimeout(() => alert(quote), 200);
          }

          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          padding: "20px",
          gap: "20px",
          minHeight: "90vh",
        }}
      >
        {/* LEFT PANEL */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(15px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Add New Task
            </h2>

            <form
              onSubmit={handleCreate}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="">Select Priority</option>
                <option value="High">🔥 High</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Low">🌿 Low</option>
              </select>

              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <button
                type="submit"
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    "linear-gradient(90deg,#ff6a00,#ee0979)",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Add Task
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task._id}          // ✅ FIXED
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;





