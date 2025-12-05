import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#e2e8f0" }}>
      <header
        style={{
          padding: "0.75rem 1.5rem",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            NextGen SaaS <span style={{ color: "#38bdf8", fontWeight: 500 }}>Enterprise Demo</span>
          </div>
          <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
            .NET 8 · JWT Auth · Multi-tenant · React · AI Insight
          </div>
        </div>
        <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {auth.isAuthenticated && (
            <>
              <NavLink to="/">Dashboard</NavLink>
              {auth.isAdmin && <NavLink to="/admin">Admin</NavLink>}
            </>
          )}
          {!auth.isAuthenticated && <NavLink to="/login">Login</NavLink>}
          {auth.isAuthenticated && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                {auth.userName} ({auth.role})
              </span>
              <button
                onClick={auth.logout}
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: 999,
                  border: "1px solid #1e293b",
                  background: "#0f172a",
                  color: "#e2e8f0",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>
      <main style={{ padding: "1.5rem" }}>{children}</main>
    </div>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  return (
    <Link
      to={to}
      style={{
        fontSize: "0.85rem",
        color: "#cbd5f5",
        textDecoration: "none"
      }}
    >
      {children}
    </Link>
  );
};
