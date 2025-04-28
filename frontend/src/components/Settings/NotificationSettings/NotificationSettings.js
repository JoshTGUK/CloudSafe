import React, { useState } from 'react';
import './NotificationSettings.css';

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    inAppNotifications: true,
    emailUpdates: {
      inspectionReminders: true,
      taskAssignments: true,
      systemUpdates: false
    },
    inAppUpdates: {
      inspectionReminders: true,
      taskAssignments: true,
      systemUpdates: true
    }
  });

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    if (name.includes('.')) {
      const [category, setting] = name.split('.');
      setNotifications(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [setting]: checked
        }
      }));
    } else {
      setNotifications(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Notification settings saved:', notifications);
  };

  return (
    <div className="notification-settings">
      <h1>Notification Settings</h1>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="notification-section">
          <h2>Email Notifications</h2>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleToggleChange}
              />
              <span>Enable Email Notifications</span>
            </label>
          </div>

          {notifications.emailNotifications && (
            <div className="notification-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="emailUpdates.inspectionReminders"
                  checked={notifications.emailUpdates.inspectionReminders}
                  onChange={handleToggleChange}
                />
                <span>Inspection Reminders</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="emailUpdates.taskAssignments"
                  checked={notifications.emailUpdates.taskAssignments}
                  onChange={handleToggleChange}
                />
                <span>Task Assignments</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="emailUpdates.systemUpdates"
                  checked={notifications.emailUpdates.systemUpdates}
                  onChange={handleToggleChange}
                />
                <span>System Updates</span>
              </label>
            </div>
          )}
        </div>

        <div className="notification-section">
          <h2>In-App Notifications</h2>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="inAppNotifications"
                checked={notifications.inAppNotifications}
                onChange={handleToggleChange}
              />
              <span>Enable In-App Notifications</span>
            </label>
          </div>

          {notifications.inAppNotifications && (
            <div className="notification-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="inAppUpdates.inspectionReminders"
                  checked={notifications.inAppUpdates.inspectionReminders}
                  onChange={handleToggleChange}
                />
                <span>Inspection Reminders</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="inAppUpdates.taskAssignments"
                  checked={notifications.inAppUpdates.taskAssignments}
                  onChange={handleToggleChange}
                />
                <span>Task Assignments</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="inAppUpdates.systemUpdates"
                  checked={notifications.inAppUpdates.systemUpdates}
                  onChange={handleToggleChange}
                />
                <span>System Updates</span>
              </label>
            </div>
          )}
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default NotificationSettings; 