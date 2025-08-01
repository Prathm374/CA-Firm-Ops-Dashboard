import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // TODO: Implement actual authentication logic
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  console.log('App rendering, isAuthenticated:', isAuthenticated);

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginPage />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}

export default App;
