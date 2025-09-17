import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../../app/features/auth/hooks/useIsAuthenticated";
import React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
