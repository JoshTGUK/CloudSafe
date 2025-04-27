import React from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate
} from 'react-router-dom';
import Login from '../components/Login/Login.js';
import Register from '../components/Register/Register';
import Dashboard from '../components/Dashboard/Dashboard';
import PropertyDashboard from '../components/PropertyDashboard/PropertyDashboard';
import BuildingMaintenance from '../components/BuildingMaintenance/BuildingMaintenance';
import BuildingMaintenanceDashboard from '../components/BuildingMaintenance/BuildingMaintenanceDashboard/BuildingMaintenanceDashboard';
import GeneralMaintenance from '../components/BuildingMaintenance/GeneralMaintenance/GeneralMaintenance';
import RoofSafety from '../components/RoofSafety/RoofSafety';
import RoofSafetyDashboard from '../components/RoofSafety/RoofSafetyDashboard';
import DavitBases from '../components/RoofSafety/DavitBases';
import AccountSettings from '../components/AccountSettings/AccountSettings';
import Documents from '../components/Documents/Documents';
import StaffSafety from '../components/StaffSafety/StaffSafety';
<<<<<<< Updated upstream
import Inspections from '../components/Inspections/Inspections';
import Tasks from '../components/Tasks/Tasks';
=======
import PlumbingSystems from '../components/BuildingMaintenance/PlumbingSystems/PlumbingSystems';
import HeatingCooling from '../components/BuildingMaintenance/HeatingCooling/HeatingCooling';
import LiftMaintenance from '../components/BuildingMaintenance/LiftMaintenance/LiftMaintenance';
import RoofMaintenance from '../components/BuildingMaintenance/RoofMaintenance/RoofMaintenance';
import FacadeMaintenance from '../components/BuildingMaintenance/FacadeMaintenance/FacadeMaintenance';
import DoorsWindows from '../components/BuildingMaintenance/DoorsWindows/DoorsWindows';
import LightingElectrical from '../components/BuildingMaintenance/LightingElectrical/LightingElectrical';
import PestControl from '../components/BuildingMaintenance/PestControl/PestControl';
import PaintingRepairs from '../components/BuildingMaintenance/PaintingRepairs/PaintingRepairs';
import DefectsReporting from '../components/BuildingMaintenance/DefectsReporting/DefectsReporting';
>>>>>>> Stashed changes
import './App.css';

// Create router with future flags and loader functions
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" errorElement={<Navigate to="/login" />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/propertydashboard/:id" element={<PropertyDashboard />} />
      
      {/* Building Maintenance Routes */}
      <Route 
        path="/properties/:id/building-maintenance/*" 
        element={<BuildingMaintenance />}
      >
        <Route index element={<BuildingMaintenanceDashboard />} />
        <Route path="dashboard" element={<BuildingMaintenanceDashboard />} />
        <Route path="general" element={<GeneralMaintenance />} />
        <Route path="plumbing" element={<PlumbingSystems />} />
        <Route path="hvac" element={<HeatingCooling />} />
        <Route path="lifts" element={<LiftMaintenance />} />
        <Route path="roof" element={<RoofMaintenance />} />
        <Route path="facade" element={<FacadeMaintenance />} />
        <Route path="doors-windows" element={<DoorsWindows />} />
        <Route path="lighting" element={<LightingElectrical />} />
        <Route path="pest-control" element={<PestControl />} />
        <Route path="painting" element={<PaintingRepairs />} />
        <Route path="defects" element={<DefectsReporting />} />
      </Route>

      {/* Other Routes */}
      <Route path="/roof-safety/:id" element={<RoofSafety />} />
      <Route path="/roof-safety/:id/dashboard" element={<RoofSafetyDashboard />} />
      <Route path="/roof-safety/:id/davit-bases" element={<DavitBases />} />
      <Route path="/properties/:id/staff-safety" element={<StaffSafety />} />
      <Route path="/account-settings" element={<AccountSettings />} />
      <Route path="/documents" element={<Documents />} />
    </Route>
  ),
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    },
    basename: '/', // Add this if your app is not served from the root
    hydrationData: window.__INITIAL_DATA__, // Add this for SSR if needed
  }
);

function App() {
  return (
<<<<<<< Updated upstream
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
=======
    <div className="App">
      <RouterProvider router={router} />
    </div>
>>>>>>> Stashed changes
  );
}

export default App;

