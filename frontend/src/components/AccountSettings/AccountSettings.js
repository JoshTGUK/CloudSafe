import React, { useState, useEffect } from 'react';
import MainHeader from '../common/MainHeader/MainHeader';
import './AccountSettings.css';

export default function AccountSettings() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    uniqueId: ''
  });

  // eslint-disable-next-line no-unused-vars
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3006/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const [notifications, setNotifications] = useState({
    overview: { icon: '👁️ ', label: ' Overview', enabled: true },
    fireSafety: { icon: '🔥', label: 'Fire Safety', enabled: true },
    roofSafety: { icon: '🏠', label: 'Roof Safety', enabled: true },
    staffSafety: { icon: '👥', label: 'Staff Safety', enabled: true },
    equipmentSafety: { icon: '⚙️', label: 'Equipment Safety', enabled: true },
    electricalSafety: { icon: '⚡', label: 'Electrical Safety', enabled: true },
    buildingMaintenance: { icon: '🏗️', label: 'Building Maintenance', enabled: true },
    emergencyPreparedness: { icon: '🚨', label: 'Emergency Preparedness', enabled: true }
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3006/api/users/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber
        })
      });

      if (response.ok) {
        alert('Profile updated successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3006/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });

      if (response.ok) {
        alert('Password changed successfully');
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="main-container">
      <MainHeader />
      <div className="settings-container">
        <div className="settings-content">
          <h1>Account Settings</h1>
          
          <div className="settings-section">
            <h2>Your Unique ID</h2>
            <div className="unique-id-box">
              <span>{user.uniqueId}</span>
              <button 
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(user.uniqueId);
                    alert('ID copied to clipboard!');
                  } catch (err) {
                    console.error('Failed to copy ID:', err);
                    alert('Failed to copy ID to clipboard');
                  }
                }}
              >
                Copy ID
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h2>Profile Picture</h2>
            <div className="profile-picture-section">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Profile"
                  className="profile-picture-preview"
                />
              )}
            </div>
          </div>

          <div className="settings-section">
            <h2>Profile Information</h2>
            <form className="settings-form">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder={user.firstName || 'Enter your first name'}
                  value={user.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder={user.lastName || 'Enter your last name'}
                  value={user.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group save-button-container">
                <button type="button" onClick={handleSaveChanges} className="save-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="settings-section">
            <h2>Change Password</h2>
            <form className="password-form">
              <div className="password-grid">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <button 
                type="button" 
                onClick={handleChangePassword}
                className="save-button"
              >
                Change Password
              </button>
            </form>
          </div>

          <div className="settings-section">
            <h2>Notification Preferences</h2>
            <div className="notification-toggles">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="toggle-switch">
                  <div className="toggle-label-container">
                    <span className="notification-icon">{value.icon}</span>
                    <span className="toggle-label">{value.label}</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={value.enabled}
                      onChange={() => {
                        setNotifications(prev => ({
                          ...prev,
                          [key]: {
                            ...prev[key],
                            enabled: !prev[key].enabled
                          }
                        }));
                      }}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </div>
    </div>
  );
} 