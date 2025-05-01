import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import PropertyDashboard from './components/PropertyDashboard/PropertyDashboard';
import FireSafety from './components/FireSafety/FireSafety';
import RoofSafety from './components/RoofSafety/RoofSafety';
import StaffSafety from './components/StaffSafety/StaffSafety';
import Login from './components/Login/Login';
import NotificationsPage from './components/NotificationsPage/NotificationsPage';
import EquipmentSafety from './components/EquipmentSafety/EquipmentSafety';
import ElectricalSafety from './components/ElectricalSafety/ElectricalSafety';
import BuildingMaintenance from './components/BuildingMaintenance/BuildingMaintenance';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/propertydashboard/:id" element={<PropertyDashboard />} />
        <Route path="/propertydashboard/:id/fire-safety/*" element={<FireSafety />} />
        <Route path="/propertydashboard/:id/roof-safety/*" element={<RoofSafety />} />
        <Route path="/propertydashboard/:id/staff-safety/*" element={<StaffSafety />} />
        <Route path="/propertydashboard/:id/equipment-safety/*" element={<EquipmentSafety />} />
        <Route path="/propertydashboard/:id/electrical-safety/*" element={<ElectricalSafety />} />
        <Route path="/propertydashboard/:id/building-maintenance/*" element={<BuildingMaintenance />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </div>
  );
}

export default App; 