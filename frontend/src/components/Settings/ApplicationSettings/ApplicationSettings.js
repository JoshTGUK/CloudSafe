import React, { useState } from 'react';
import './ApplicationSettings.css';

function ApplicationSettings() {
  const [settings, setSettings] = useState({
    timezone: 'UTC',
    dateFormat: 'DD/MM/YYYY',
    maintenanceMode: false
  });

  const timezones = [
    'UTC',
    'GMT',
    'EST',
    'CST',
    'PST',
    'AEST',
    // Add more timezones as needed
  ];

  const dateFormats = [
    'DD/MM/YYYY',
    'MM/DD/YYYY',
    'YYYY-MM-DD',
    'DD-MM-YYYY'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Settings saved:', settings);
  };

  return (
    <div className="app-settings">
      <h1>Application Settings</h1>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label htmlFor="timezone">Default Timezone</label>
          <select
            id="timezone"
            name="timezone"
            value={settings.timezone}
            onChange={handleChange}
          >
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dateFormat">Date Format</label>
          <select
            id="dateFormat"
            name="dateFormat"
            value={settings.dateFormat}
            onChange={handleChange}
          >
            {dateFormats.map(format => (
              <option key={format} value={format}>{format}</option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
            />
            <span>Enable Maintenance Mode</span>
          </label>
          <p className="help-text">
            When enabled, only administrators can access the system
          </p>
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ApplicationSettings; 