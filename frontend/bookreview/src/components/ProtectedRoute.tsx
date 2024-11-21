import { isAuthenticated } from '@/lib/auth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }:{children:ReactNode}) => {
  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
