import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { currentUser } = useContext(AppContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
}
