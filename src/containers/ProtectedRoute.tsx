import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import React from "react";
import Spinner from "../components/Spinner.tsx";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useIsAuthenticated();

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
