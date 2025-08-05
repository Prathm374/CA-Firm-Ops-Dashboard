import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  console.log('AppContent: Auth state', { isAuthenticated, loading });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
