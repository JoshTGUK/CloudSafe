import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './BrandingSettings.css';

function BrandingSettings() {
  const [branding, setBranding] = useState({
    logo: null,
    primaryColor: '#1a80e5',
    secondaryColor: '#637587',
    favicon: null
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file && !file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setBranding(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setBranding(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Branding settings saved:', branding);
    toast.success('Branding settings updated successfully');
  };

  return (
    <div className="branding-settings">
      <h1>Branding Settings</h1>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-card">
          <div className="form-group">
            <label htmlFor="logo">Company Logo</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="logo"
                name="logo"
                onChange={handleFileChange}
                accept="image/*"
              />
              <p className="help-text">
                Recommended size: 200x50px, PNG or SVG format
              </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="primaryColor">Primary Theme Color</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                id="primaryColor"
                name="primaryColor"
                value={branding.primaryColor}
                onChange={handleColorChange}
              />
              <input
                type="text"
                value={branding.primaryColor}
                onChange={handleColorChange}
                name="primaryColor"
                className="color-text-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="secondaryColor">Secondary Accent Color</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                id="secondaryColor"
                name="secondaryColor"
                value={branding.secondaryColor}
                onChange={handleColorChange}
              />
              <input
                type="text"
                value={branding.secondaryColor}
                onChange={handleColorChange}
                name="secondaryColor"
                className="color-text-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="favicon">Favicon</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="favicon"
                name="favicon"
                onChange={handleFileChange}
                accept="image/*"
              />
              <p className="help-text">
                Recommended size: 32x32px, PNG or ICO format
              </p>
            </div>
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default BrandingSettings; 