import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SettingsSidebar from './SettingsSidebar/SettingsSidebar';
import SettingsDashboard from './SettingsDashboard/SettingsDashboard';
import CompanyInformation from './CompanyInformation/CompanyInformation';
import ApplicationSettings from './ApplicationSettings/ApplicationSettings';
import NotificationSettings from './NotificationSettings/NotificationSettings';
import SecuritySettings from './SecuritySettings/SecuritySettings';
import BrandingSettings from './BrandingSettings/BrandingSettings';
import MainHeader from '../common/MainHeader/MainHeader';
import './Settings.css';

function Settings() {
  const location = useLocation();
  
  return (
    <div className="settings-layout">
      <MainHeader />
      <div className="settings-container">
        <SettingsSidebar />
        <main className="settings-content">
          <Routes>
            <Route index element={<SettingsDashboard />} />
            <Route path="company" element={<CompanyInformation />} />
            <Route path="application" element={<ApplicationSettings />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="branding" element={<BrandingSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Settings; 