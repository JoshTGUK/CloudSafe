import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import PropertyDashboard from './components/PropertyDashboard/PropertyDashboard';
import FireSafety from './components/FireSafety/FireSafety';
import RoofSafety from './components/RoofSafety/RoofSafety';
import Login from './components/Login/Login';
import NotificationsPage from './components/NotificationsPage/NotificationsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/propertydashboard/:id" element={<PropertyDashboard />} />
        <Route path="/properties/:id/fire-safety" element={<FireSafety />} />
        <Route path="/properties/:id/roof-safety" element={<RoofSafety />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </div>
  );
}

export default App; 