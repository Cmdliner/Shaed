import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../utils/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [ isAuthenticated, isLoading, error ] = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
    <div className="text-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;