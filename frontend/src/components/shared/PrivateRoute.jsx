import React from 'react'; 
import { Navigate } from 'react-router-dom';
import useAuth from '../../contexts/authContext';
import useLoading from '../../contexts/loadingContext';
import Loader from '../Loader';

const PrivateRoute = ({ children, roles = [] }) => {
  const { loading } = useLoading(); // Global loading state
  const { isAuthenticated, user } = useAuth(); // User authentication and role info

  // Show loading spinner or placeholder while loading
  if (loading) {
    return <Loader/>;
  }
  if(!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  // If user is undefined/null (should not happen for authenticated users)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to email verification if the user is not verified
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // Redirect if the user doesn't have the required roles
  if (roles.length && !roles.includes(user?.role)) {
    return <Navigate to="/user/dashboard" replace />;
  }

  // Render the protected content
  return children;
};

export default PrivateRoute;
