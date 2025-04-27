import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login.js';
import Register from '../components/Register/Register';
import Dashboard from '../components/Dashboard/Dashboard';
import PropertyDashboard from '../components/PropertyDashboard/PropertyDashboard';
import RoofSafety from '../components/RoofSafety/RoofSafety';
import RoofSafetyDashboard from '../components/RoofSafety/RoofSafetyDashboard';
import DavitBases from '../components/RoofSafety/DavitBases';
import AccountSettings from '../components/AccountSettings/AccountSettings';
import Documents from '../components/Documents/Documents';
import StaffSafety from '../components/StaffSafety/StaffSafety';
import Inspections from '../components/Inspections/Inspections';
import Tasks from '../components/Tasks/Tasks';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/propertydashboard/:id" element={<PropertyDashboard />} />
          <Route path="/roof-safety/:id" element={<RoofSafety />} />
          <Route path="/roof-safety/:id/dashboard" element={<RoofSafetyDashboard />} />
          <Route path="/roof-safety/:id/davit-bases" element={<DavitBases />} />
          <Route path="/properties/:id/staff-safety" element={<StaffSafety />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/inspections" element={<Inspections />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

