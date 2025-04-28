import React from 'react';
import './Settings.css';
import MainHeader from '../common/MainHeader/MainHeader';

function Settings() {
  return (
    <div className="settings-page">
      <MainHeader />
      <div className="settings-container">
        <h1>Settings</h1>
        <div className="settings-content">
          <section className="settings-section">
            <h2>General Settings</h2>
            {/* Add settings content here */}
            <p>Settings page is under construction.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings; 