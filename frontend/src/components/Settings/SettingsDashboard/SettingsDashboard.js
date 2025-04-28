import React from 'react';
import { Link } from 'react-router-dom';
import './SettingsDashboard.css';

function SettingsDashboard() {
  return (
    <div className="settings-dashboard">
      <h1>Settings Overview</h1>
      <div className="settings-cards">
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-card-icon">🏢</span>
            <h2>Company Information</h2>
          </div>
          <p>Manage your company details, logo, and contact information</p>
          <Link to="/settings/company" className="settings-card-link">
            Manage Company Info
          </Link>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-card-icon">🔧</span>
            <h2>Application Settings</h2>
          </div>
          <p>Configure timezone, date format, and maintenance settings</p>
          <Link to="/settings/application" className="settings-card-link">
            Manage App Settings
          </Link>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-card-icon">🔔</span>
            <h2>Notification Settings</h2>
          </div>
          <p>Control your email and in-app notification preferences</p>
          <Link to="/settings/notifications" className="settings-card-link">
            Manage Notifications
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SettingsDashboard; 