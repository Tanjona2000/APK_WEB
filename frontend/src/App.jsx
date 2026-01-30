import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateRequest from './pages/CreateRequest';
import RequestDetail from './pages/RequestDetail';
import EditRequest from './pages/EditRequest';
import ManagerDashboard from './pages/ManagerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const { currentUser } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={currentUser ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/create-request" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
      <Route path="/request/:id" element={<ProtectedRoute><RequestDetail /></ProtectedRoute>} />
      <Route path="/request/:id/edit" element={<ProtectedRoute><EditRequest /></ProtectedRoute>} />
      <Route path="/manager" element={<ProtectedRoute requiredRole="manager"><ManagerDashboard /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
