import React from "react";

interface AiInsightPanelProps {
  insight?: string;
  loading: boolean;
  onRefresh: () => void;
  disabled: boolean;
}

export const AiInsightPanel: React.FC<AiInsightPanelProps> = ({
  insight,
  loading,
  onRefresh,
  disabled
}) => {
  return (
    <div
      style={{
        marginTop: "1.5rem",
        padding: "1rem 1.25rem",
        borderRadius: 10,
        border: "1px solid #1e293b",
        background:
          "radial-gradient(circle at top left, rgba(96,165,250,0.15), transparent 55%), #020617"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 600 }}>AI Insight</h2>
        <button
          onClick={onRefresh}
          disabled={disabled || loading}
          style={{
            padding: "0.35rem 0.75rem",
            borderRadius: 999,
            border: "1px solid #38bdf8",
            backgroundColor: disabled ? "#0f172a" : "#020617",
            color: "#e0f2fe",
            fontSize: "0.8rem",
            cursor: disabled || loading ? "not-allowed" : "pointer",
            opacity: disabled ? 0.4 : 1
          }}
        >
          {loading ? "Analyzing..." : "Generate Insight"}
        </button>
      </div>
      <p style={{ marginTop: "0.75rem", whiteSpace: "pre-line", fontSize: "0.85rem", color: "#cbd5f5" }}>
        {insight || "Select an account and click 'Generate Insight' to get an AI-style summary of recent activity."}
      </p>
    </div>
  );
};
