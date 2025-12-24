require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const testSMSRoute = require("./routes/testSMS");

const app = express();

// Middleware (ALWAYS FIRST)
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", testSMSRoute);

// Default route
app.get("/", (req, res) => {
  res.send("TaskFlow Backend is running 🚀");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
