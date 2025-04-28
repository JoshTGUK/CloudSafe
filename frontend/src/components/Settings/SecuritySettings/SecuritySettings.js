import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './SecuritySettings.css';

function SecuritySettings() {
  const [security, setSecurity] = useState({
    passwordPolicy: 'standard',
    twoFactorEnabled: false,
    backupEmail: ''
  });

  const passwordPolicies = [
    { value: 'standard', label: 'Standard (8+ characters)' },
    { value: 'strong', label: 'Strong (12+ chars, special characters)' },
    { value: 'custom', label: 'Custom Policy' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurity(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateEmail = (email) => {
    if (!email) return true; // Optional field
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (security.backupEmail && !validateEmail(security.backupEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // TODO: Implement save functionality
    console.log('Security settings saved:', security);
    toast.success('Security settings updated successfully');
  };

  return (
    <div className="security-settings">
      <h1>Security Settings</h1>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-card">
          <div className="form-group">
            <label htmlFor="passwordPolicy">Password Policy</label>
            <select
              id="passwordPolicy"
              name="passwordPolicy"
              value={security.passwordPolicy}
              onChange={handleChange}
            >
              {passwordPolicies.map(policy => (
                <option key={policy.value} value={policy.value}>
                  {policy.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="twoFactorEnabled"
                checked={security.twoFactorEnabled}
                onChange={handleChange}
              />
              <span>Enable Two-Factor Authentication</span>
            </label>
            <p className="help-text">
              Adds an extra layer of security to your account
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="backupEmail">Backup Authentication Email</label>
            <input
              type="email"
              id="backupEmail"
              name="backupEmail"
              value={security.backupEmail}
              onChange={handleChange}
              placeholder="Optional"
            />
            <p className="help-text">
              Used for account recovery and security notifications
            </p>
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default SecuritySettings; 