import React from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const statusIcon = (s) => {
 
  switch ((s || "").toLowerCase()) {
    case "offer":
      return <FiCheckCircle />;
    case "rejected":
      return <FiXCircle />;
    case "interview":
    default:
      return <FiClock />;
  }
};

export default function ApplicationCard({
  app,
  onEdit = () => {},
  onDelete = () => {},
  onOpen = () => {},
}) {
  const date = app?.appliedAt
    ? new Date(app.appliedAt).toLocaleDateString()
    : "-";

  const logo = app?.logos?.[0] || "/default-logo.svg";

  
  const handleClick = (e) => {
    
    if (e.target.closest("button")) return;
    onOpen(app);
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(app);
    }
  };

  return (
    <article
      className="panel"
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        cursor: "pointer",
        transition: "transform .12s ease, box-shadow .12s ease",
        outline: "none",
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <img
        src={logo}
        alt={app.company || "company"}
        style={{
          width: 64,
          height: 64,
          objectFit: "contain",
          borderRadius: 10,
          background: "rgba(255,255,255,0.02)",
          padding: 8,
        }}
        onError={(e) => {
          e.target.src = "/default-logo.svg";
          e.target.onerror = null; 
        }}
      />

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>
              {app.position || "—"}
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              {app.company || "—"} • {date}
            </div>
          </div>

          <div>
            <span
              className={`chip ${app.status}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textTransform: "capitalize",
              }}
            >
              {statusIcon(app.status)} {app.status || "applied"}
            </span>
          </div>
        </div>

        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(app);
            }}
            className="btn"
            title="Edit"
            aria-label="Edit"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <FiEdit2 /> Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(app);
            }}
            className="btn"
            title="Delete"
            aria-label="Delete"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </article>
  );
}
