import React, { useEffect, useState } from "react";
import { useApiClient } from "../api/client";

export const AdminPage: React.FC = () => {
  const api = useApiClient();
  const [tenants, setTenants] = useState<any[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    api
      .getTenants()
      .then((res: any) => setTenants(res))
      .catch((err: any) => {
        console.error(err);
        setError("Failed to load tenants (Admin only).");
      });
  }, []);

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "1rem 1.25rem",
        borderRadius: 10,
        border: "1px solid #1e293b",
        backgroundColor: "#020617"
      }}
    >
      <h1 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>Admin &mdash; Tenants</h1>
      <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.75rem" }}>
        This view is protected by role-based authorization (<code>Admin</code> role only). It calls the
        <code>/api/tenants</code> endpoint which checks the role claim from the JWT.
      </p>
      {error && <div style={{ fontSize: "0.8rem", color: "#fca5a5" }}>{error}</div>}
      {!error && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tenants.map((t) => (
            <li
              key={t.id}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: 8,
                border: "1px solid #1e293b",
                marginBottom: "0.5rem",
                backgroundColor: "#020617"
              }}
            >
              <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{t.name}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Tenant ID: {t.id}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
