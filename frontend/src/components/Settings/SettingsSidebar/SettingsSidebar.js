import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './SettingsSidebar.css';

function SettingsSidebar() {
  const location = useLocation();

  return (
    <aside className="settings-sidebar">
      <nav className="settings-nav">
        <NavLink 
          to="/settings"
          end
          className={({ isActive }) => `settings-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="settings-nav-icon">⚙️</span>
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
      </nav>
    </aside>
  );
}

export default SettingsSidebar; 