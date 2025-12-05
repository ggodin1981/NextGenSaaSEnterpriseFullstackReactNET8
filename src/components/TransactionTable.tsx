import React from "react";

interface TransactionTableProps {
  transactions: any[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  if (!transactions.length) {
    return <p style={{ color: "#64748b" }}>No transactions yet.</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "0.5rem",
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #1e293b"
      }}
    >
      <thead style={{ backgroundColor: "#020617" }}>
        <tr>
          <th style={th}>Date</th>
          <th style={th}>Type</th>
          <th style={th}>Amount</th>
          <th style={th}>Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id} style={{ borderTop: "1px solid #1e293b" }}>
            <td style={td}>{new Date(t.date).toLocaleString()}</td>
            <td style={td}>{t.type}</td>
            <td style={td}>{t.amount}</td>
            <td style={td}>{t.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const th: React.CSSProperties = {
  padding: "0.5rem 0.75rem",
  textAlign: "left",
  fontWeight: 600,
  fontSize: "0.85rem",
  color: "#e2e8f0"
};

const td: React.CSSProperties = {
  padding: "0.45rem 0.75rem",
  fontSize: "0.85rem",
  color: "#cbd5f5"
};
