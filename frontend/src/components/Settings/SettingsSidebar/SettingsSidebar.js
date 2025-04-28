import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCog, FaBuilding, FaWrench, FaBell, FaLock, FaPalette } from 'react-icons/fa';
import './SettingsSidebar.css';

function SettingsSidebar() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(`/propertydashboard/${id}`);
  };

  return (
    <aside className="settings-sidebar">
      <div className="settings-nav">
        <button className="sidebar-back-btn" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>
        
        <NavLink 
          to="/settings"
          end
          className={({ isActive }) => `settings-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="settings-nav-icon"><FaCog /></span>
          <span>Overview</span>
        </NavLink>
        <NavLink 
          to="/settings/company"
          className={({ isActive }) => `settings-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="settings-nav-icon">🏢</span>
          <span>Company Information</span>
        </NavLink>
        <NavLink 
          to="/settings/application"
          className={({ isActive }) => `settings-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="settings-nav-icon">🔧</span>
          <span>Application Settings</span>
        </NavLink>
        <NavLink 
          to="/settings/notifications"
          className={({ isActive }) => `settings-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="settings-nav-icon">🔔</span>
          <span>Notification Settings</span>
        </NavLink>
        <NavLink 
          to="/settings/security"
          className={({ isActive }) => `settings-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="settings-nav-icon">🔒</span>
          <span>Security Settings</span>
        </NavLink>
        <NavLink 
          to="/settings/branding"
          className={({ isActive }) => `settings-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="settings-nav-icon">🎨</span>
          <span>Branding Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default SettingsSidebar; 