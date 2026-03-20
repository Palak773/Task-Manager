import React from "react";

export default function Badge({ status }) {
  const getStyle = () => {
    switch (status) {
      case "open":
        return {
          background: "#1f2937",
          color: "#60a5fa",
          border: "1px solid #3b82f6",
        };
      case "in-progress":
        return {
          background: "#1f2937",
          color: "#facc15",
          border: "1px solid #eab308",
        };
      case "done":
        return {
          background: "#1f2937",
          color: "#34d399",
          border: "1px solid #10b981",
        };
      default:
        return {
          background: "#1f2937",
          color: "#9ca3af",
          border: "1px solid #6b7280",
        };
    }
  };

  return (
    <span
      style={{
        ...styles.badge,
        ...getStyle(),
      }}
    >
      {status}
    </span>
  );
}

const styles = {
  badge: {
    padding: "3px 8px",
    borderRadius: "6px",
    fontSize: "11px",
    fontFamily: "var(--font-mono)",
    textTransform: "capitalize",
  },
};