import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import PropertyDashboard from './components/PropertyDashboard/PropertyDashboard';
import RoofSafety from './components/RoofSafety/RoofSafety';
import FireSafety from './components/FireSafety/FireSafety';
import StaffSafety from './components/StaffSafety/StaffSafety';
import EquipmentSafety from './components/EquipmentSafety/EquipmentSafety';
import ElectricalSafety from './components/ElectricalSafety/ElectricalSafety';
import ErrorPage from './components/ErrorPage/ErrorPage';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
