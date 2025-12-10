import React, { useMemo } from "react";
import { Chrono } from "react-chrono";
import { TimelineContainer } from "../Style/Timelinecss";

export default function TimelineView({ applications = [] }) {
  const items = useMemo(() => {
    // 1. Sort by date (Newest first)
    const sorted = [...(applications || [])].sort(
      (a, b) => new Date(b.appliedAt || 0) - new Date(a.appliedAt || 0)
    );

    return sorted.map((a) => ({
      title: a.appliedAt
        ? new Date(a.appliedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "N/A",
      cardTitle: a.position || "Unknown Role",
      cardSubtitle: `${a.company || "Unknown Company"}`,
      cardDetailedText: a.notes || `Status: ${a.status}`, // Fallback content
    }));
  }, [applications]);

  
  if (!items.length) {
    return (
      <div
        className="panel"
        style={{ padding: 32, textAlign: "center", color: "var(--muted)" }}
      >
        No applications to show on timeline yet.
      </div>
    );
  }

  return (
    <TimelineContainer
      className="panel"
      style={{ padding: 0, overflow: "hidden" }}
    >
      <div style={{ width: "100%", height: "600px" }}>
        <Chrono
          items={items}
          mode="VERTICAL_ALTERNATING" 
          hideControls
          disableToolbar
          enableOutline
          cardHeight={80}
          
          theme={{
            primary: "var(--accent)",
            secondary: "rgba(255,255,255,0.05)",
            cardBgColor: "#222",
            cardForeColor: "#fff",
            titleColor: "var(--muted)",
            titleColorActive: "var(--accent)",
          }}
          fontSizes={{
            cardSubtitle: "0.85rem",
            cardText: "0.8rem",
            cardTitle: "1rem",
            title: "0.85rem",
          }}
        />
      </div>
    </TimelineContainer>
  );
}
