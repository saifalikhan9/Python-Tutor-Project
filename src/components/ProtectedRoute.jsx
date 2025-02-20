import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApiKey } from "../context/ApiKeyContext";

export const ProtectedRoute = ({ children, requireApiKey = true }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { apiKey } = useApiKey();

  

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Only enforce the API key requirement if this prop is true.
  if (requireApiKey && !apiKey) {
    return <Navigate to="/settings" replace />;
  }

  return <>{children}</>;
};
