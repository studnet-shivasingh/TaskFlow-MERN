import React from "react";

const Navbar = () => {
  const name = localStorage.getItem("userName");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #1e293b, #0f172a)",
        padding: "16px 0",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* BRAND */}
        <div>
          <h2 style={{ color: "#38bdf8", marginBottom: "2px" }}>
            TaskFlow
          </h2>
          <small style={{ color: "#94a3b8" }}>
            Organize. Focus. Execute.
          </small>
        </div>

        {/* USER */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: "#e5e7eb", fontSize: "14px" }}>
            Hi, {name || "User"}
          </span>
          <button
            onClick={logout}
            style={{
              backgroundColor: "#ef4444",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
