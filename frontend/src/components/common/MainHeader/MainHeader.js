import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import allSafeLogo from '../../../assets/ALL-Safe-logo.png';
import './MainHeader.css';

const UserAvatar = () => (
  <div className="user-avatar">
    <i className="fas fa-user"></i>
  </div>
);

export default function MainHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <img src={allSafeLogo} alt="ALL Safe Logo" className="logo" />
      <div className="header-right">
        <nav className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/documents" className="nav-link">Documents</Link>
          <Link to="/inspections" className="nav-link">Inspections</Link>
          <Link to="/tasks" className="nav-link">Tasks</Link>
        </nav>
        <div className="header-icons">
          <div className="icon"><i className="fas fa-search"></i></div>
          <div className="icon"><i className="fas fa-bell"></i></div>
          <div className="icon"><i className="fas fa-question-circle"></i></div>
          <div className="user-avatar-container" onClick={() => setShowUserMenu(!showUserMenu)}>
            <UserAvatar />
            {showUserMenu && (
              <div className="user-menu">
                <Link to="/account-settings">Account</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
