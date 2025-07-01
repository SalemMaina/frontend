// src/components/Home.js
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      
      {user ? (
        <div className="user-info">
          <h2>Hello, {user.username}!</h2>
          <p>Email: {user.email}</p>
          
          <div className="protected-content">
            <h3>This is protected content</h3>
            <p>Only authenticated users can see this.</p>
          </div>
          
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-message">
          <p>You are not logged in.</p>
          <button onClick={() => navigate('/login')} className="login-btn">
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;