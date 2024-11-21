import { isAuthenticated } from '@/lib/auth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


const PublicRoute = ({ children }:{children:ReactNode}) => {
  if (isAuthenticated()) {
    // Redirect to home if already authenticated
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
