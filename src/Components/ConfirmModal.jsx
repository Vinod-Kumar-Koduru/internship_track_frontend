import React from "react";

export default function ConfirmModalFun({
  open = false,
  title = "Confirm",
  message = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        zIndex: 1200,
        padding: 16,
      }}
      
      onClick={onCancel}
    >
      <div
        className="panel"
        
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{ width: 480, maxWidth: "100%" }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ color: "var(--muted)" }}>{message}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 8,
          }}
        >
          <button className="btn" onClick={onCancel}>
            {cancelText}
          </button>

          <button
            className="btn"
            onClick={onConfirm}
            style={{
              background: "var(--accent)",
              color: "#000",
              fontWeight: 700,
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
