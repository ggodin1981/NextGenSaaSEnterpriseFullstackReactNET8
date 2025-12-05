import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { AdminPage } from "./AdminPage";
import { useAuth } from "../state/AuthContext";

export const App: React.FC = () => {
  const auth = useAuth();

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            auth.isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin"
          element={
            auth.isAuthenticated && auth.isAdmin ? (
              <AdminPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
};
