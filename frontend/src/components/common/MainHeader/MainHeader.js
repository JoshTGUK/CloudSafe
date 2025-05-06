import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import allSafeLogo from '../../../assets/ALL-Safe-logo.png';
import NotificationPopup from '../../NotificationPopup/NotificationPopup';
import { FaSearch, FaBell, FaQuestionCircle } from 'react-icons/fa';
import './MainHeader.css';

const UserAvatar = () => (
  <div className="user-avatar">
    <i className="fas fa-user"></i>
  </div>
);

export default function MainHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract property id from URL if present
  const propertyMatch = location.pathname.match(/\/properties\/(\d+)/);
  const propertyId = propertyMatch ? propertyMatch[1] : null;
  const documentsLink = propertyId ? `/properties/${propertyId}/documents` : '/documents';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <Link to="/dashboard">
        <img src={allSafeLogo} alt="ALL Safe Logo" className="logo" />
      </Link>
      <div className="header-right">
        <nav className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to={documentsLink} className="nav-link">Documents</Link>
          <Link to="/inspections" className="nav-link">Inspections</Link>
          <Link to="/tasks" className="nav-link">Tasks</Link>
        </nav>
        <div className="header-icons">
          <div className="icon"><FaSearch /></div>
          <div 
            className="icon"
            onMouseEnter={() => setShowNotifications(true)}
            onMouseLeave={() => setShowNotifications(false)}
          >
            <FaBell />
            <NotificationPopup isOpen={showNotifications} />
          </div>
          <div className="icon"><FaQuestionCircle /></div>
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
