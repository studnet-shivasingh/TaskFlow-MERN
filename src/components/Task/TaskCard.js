import React from "react";

const priorityStyles = {
  High: {
    border: "2px solid #ff4d4f",
    background: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
    emoji: "🔥",
  },
  Medium: {
    border: "2px solid #faad14",
    background: "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
    emoji: "⚡",
  },
  Low: {
    border: "2px solid #52c41a",
    background: "linear-gradient(135deg,#d4fc79,#96e6a1)",
    emoji: "🌿",
  },
};

const TaskCard = ({ task, onDelete, onToggle }) => {
  const style = priorityStyles[task.priority || "Low"];
  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "18px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        transition: "all 0.3s ease",
        transform: "scale(1)",
        opacity: task.completed ? 0.75 : 1,
        textDecoration: task.completed ? "line-through" : "none",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>
          {style.emoji} {task.title}
        </h3>

        {task.completed && (
          <span style={{ fontSize: "22px" }}>✅</span>
        )}
      </div>

      {/* Description */}
      <p style={{ marginTop: "6px", fontSize: "14px" }}>
        {task.description}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "14px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>
          Priority: {task.priority}
        </span>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => onToggle(onToggle(task._id))}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: task.completed
                ? "#52c41a"
                : "linear-gradient(90deg,#1890ff,#40a9ff)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {task.completed ? "Done ✔" : "Mark Done"}
          </button>

          <button
            onClick={() => onDelete(task._id)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#ff4d4f",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Delete 🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;




