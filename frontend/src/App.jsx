import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TaskDetails from './components/TaskDetails';
import TaskEdit from './components/TaskEdit';
import TaskList from './components/TaskList';

// A loading component that can be styled as needed
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f5f5f5'
  }}>
    <div>Loading...</div>
  </div>
);

// A wrapper for <Route> that redirects to the login screen if not authenticated
function PrivateRoute({ children, requireAdmin = false }) {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to dashboard if not admin but admin required
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  const { currentUser } = useAuth();
  const location = useLocation();

  // If user is logged in and tries to access login/register, redirect to dashboard
  if (currentUser && ['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks/:id"
        element={
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks/:id/edit"
        element={
          <PrivateRoute requireAdmin={true}>
            <TaskEdit />
          </PrivateRoute>
        }
      />

      {/* Redirect root to dashboard */}
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <Navigate to="/dashboard" replace />
          </PrivateRoute>
        } 
      />
      
      {/* Catch-all route - redirect to dashboard */}
      <Route 
        path="*" 
        element={
          <PrivateRoute>
            <Navigate to="/dashboard" replace />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

// Main application component
function App() {
  // Get authentication state
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated and not on a public route
  React.useEffect(() => {
    const publicPaths = ['/login', '/register'];
    if (!loading && !currentUser && !publicPaths.includes(location.pathname)) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [currentUser, loading, location, navigate]);

  // Show loading spinner while checking auth state
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

// App wrapper to provide context providers
function AppWrapper() {
  return (
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  );
}

// Export the AppWrapper as the default export
export default AppWrapper;
