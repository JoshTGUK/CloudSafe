import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import PropertyDashboard from './components/PropertyDashboard/PropertyDashboard';
import RoofSafety from './components/RoofSafety/RoofSafety';
import FireSafety from './components/FireSafety/FireSafety';
import StaffSafety from './components/StaffSafety/StaffSafety';
import EquipmentSafety from './components/EquipmentSafety/EquipmentSafety';
import ElectricalSafety from './components/ElectricalSafety/ElectricalSafety';
import BuildingMaintenance from './components/BuildingMaintenance/BuildingMaintenance';
import BuildingMaintenanceDashboard from './components/BuildingMaintenance/BuildingMaintenanceDashboard/BuildingMaintenanceDashboard';
import GeneralMaintenance from './components/BuildingMaintenance/GeneralMaintenance/GeneralMaintenance';
import ErrorPage from './components/ErrorPage/ErrorPage';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Tasks from './components/Tasks/Tasks';
import Inspections from './components/Inspections/Inspections';
import Documents from './components/Documents/Documents';
import EmergencyPreparedness from './components/EmergencyPreparedness/EmergencyPreparedness';
import EmergencyLighting from './components/EmergencyPreparedness/EmergencyLighting/EmergencyLighting';
import EscapeRoutes from './components/EmergencyPreparedness/EscapeRoutes/EscapeRoutes';
import AssemblyPoints from './components/EmergencyPreparedness/AssemblyPoints/AssemblyPoints';
import EmergencyPlans from './components/EmergencyPreparedness/EmergencyPlans/EmergencyPlans';
import Defibrillators from './components/EmergencyPreparedness/Defibrillators/Defibrillators';
import IncidentReporting from './components/EmergencyPreparedness/IncidentReporting/IncidentReporting';
import Settings from './components/Settings/Settings';
import SettingsDashboard from './components/Settings/SettingsDashboard/SettingsDashboard';
import CompanyInformation from './components/Settings/CompanyInformation/CompanyInformation';
import ApplicationSettings from './components/Settings/ApplicationSettings/ApplicationSettings';
import NotificationSettings from './components/Settings/NotificationSettings/NotificationSettings';
import SecuritySettings from './components/Settings/SecuritySettings/SecuritySettings';
import BrandingSettings from './components/Settings/BrandingSettings/BrandingSettings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    future: {
      v7_skipActionErrorRevalidation: true
    },
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
      {
        path: "propertydashboard/:id",
        element: <ProtectedRoute><PropertyDashboard /></ProtectedRoute>
      },
      {
        path: "properties/:id",
        element: <ProtectedRoute><PropertyDashboard /></ProtectedRoute>
      },
      {
        path: "properties/:id/building-maintenance/*",
        element: <ProtectedRoute><BuildingMaintenance /></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <BuildingMaintenanceDashboard />
          },
          {
            path: "dashboard",
            element: <BuildingMaintenanceDashboard />
          },
          {
            path: "general",
            element: <GeneralMaintenance />
          }
        ]
      },
      {
        path: "properties/:id/roof-safety",
        element: <ProtectedRoute><RoofSafety /></ProtectedRoute>
      },
      {
        path: "properties/:id/fire-safety",
        element: <ProtectedRoute><FireSafety /></ProtectedRoute>
      },
      {
        path: "properties/:id/staff-safety",
        element: <ProtectedRoute><StaffSafety /></ProtectedRoute>
      },
      {
        path: "equipment-safety/*",
        element: <ProtectedRoute><EquipmentSafety /></ProtectedRoute>
      },
      {
        path: "electrical-safety/*",
        element: <ProtectedRoute><ElectricalSafety /></ProtectedRoute>
      },
      {
        path: "documents",
        element: <ProtectedRoute><Documents /></ProtectedRoute>
      },
      {
        path: "tasks",
        element: <ProtectedRoute><Tasks /></ProtectedRoute>
      },
      {
        path: "inspections",
        element: <ProtectedRoute><Inspections /></ProtectedRoute>
      },
      {
        path: "properties/:id/emergency-preparedness/*",
        element: <ProtectedRoute><EmergencyPreparedness /></ProtectedRoute>
      },
      {
        path: "settings/*",
        element: <ProtectedRoute><Settings /></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <SettingsDashboard />
          },
          {
            path: "company",
            element: <CompanyInformation />
          },
          {
            path: "application",
            element: <ApplicationSettings />
          },
          {
            path: "notifications",
            element: <NotificationSettings />
          },
          {
            path: "security",
            element: <SecuritySettings />
          },
          {
            path: "branding",
            element: <BrandingSettings />
          }
        ]
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
);
